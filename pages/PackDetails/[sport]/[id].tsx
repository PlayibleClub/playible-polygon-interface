import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  // fetchPromoPackTokenMetadata,
  fetchRegularPackTokenMetadata,
  checkTokenOwner,
} from 'utils/polygon/ethers';
import Container from 'components/containers/Container';
import 'regenerator-runtime/runtime';
import BackFunction from 'components/buttons/BackFunction';
import Image from 'next/image';
import Link from 'next/link';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import openPackAbi from 'utils/polygon/ABI/openPackAbi.json';
import packNftAbi from 'utils/polygon/ABI/pack_nft.json';
import Web3 from 'web3';
export default function PackDetails(props) {
  const {
    state: { wallet },
  } = useWalletSelector();

  const router = useRouter();
  const { query } = props;
  const id = query.id.toString();
  const packType = id % 100000;
  const myPack = {
    packName:
      id.length === 6 || packType === 2
        ? 'SOULBOUND PACK'
        : packType === 1
        ? 'PROMO PACK'
        : 'STARTER PACK',
    id: id,
    sport: query.sport.toString().toUpperCase(),
  };
  const openPackContractAddress = '0xd9dEAB4B51b8477f7ccD274413E66F6142877C49';
  const regularPackStorageContractAddress = '0x00AdA1B38dFF832A8b85935B8B8BC9234024084A';
  const [packDetails, setPackDetails] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isOwner, setIsOwner] = useState(null);

  async function requestAndMint() {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(openPackAbi, openPackContractAddress);
        const accounts = await web3.eth.getAccounts();

        // Estimate gas for mintPacks function
        const gasEstimate = await contract.methods
          .requestRandomWords()
          .estimateGas({ from: accounts[0] });
        console.log('Estimated Gas:', gasEstimate);

        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: accounts[0],
          to: openPackContractAddress,
          //@ts-ignore
          gas: parseInt(gasEstimate),
          gasPrice: gasPrice,
          data: contract.methods.requestRandomWords().encodeABI(),
        };

        // Call mint regular packs function
        const receipt = await web3.eth.sendTransaction(tx).on('transactionHash', function (hash) {
          console.log('Transaction Hash:', hash);
        });

        console.log('Request Successful');

        // Get requestId by user
        //@ts-ignore
        const requestId = await contract.methods.getRequestIdByUser(accounts[0]).call();
        console.log('Random words requested successful, requestId:', requestId);

        let loopCount = 0;
        const intervalId = setInterval(async () => {
          loopCount++;
          console.log('Checking request status...', loopCount);

          //@ts-ignore
          let fulfilled = await contract.methods.getRequestStatus(requestId).call();

          //@ts-ignore
          if (fulfilled.fulfilled) {
            clearInterval(intervalId);
            // Estimate gas for mintPacks function
            const gasEstimate = await contract.methods
              //@ts-ignore
              .mintBatch(requestId)
              .estimateGas({ from: accounts[0] });
            console.log('Estimated Gas:', gasEstimate);

            const gasPrice = await web3.eth.getGasPrice();
            const mintTx = {
              from: accounts[0],
              to: openPackContractAddress,
              //@ts-ignore
              gas: parseInt(gasEstimate),
              gasPrice: gasPrice,
              //@ts-ignore
              data: contract.methods.mintBatch(requestId).encodeABI(),
            };

            const mintReceipt = await web3.eth
              .sendTransaction(mintTx)
              .on('transactionHash', function (hash) {
                console.log('Mint Transaction Hash:', hash);
              })
              .on('receipt', function (receipt) {
                console.log('Minting Successful');

                router.push(`/TokenDrawPage/${receipt.transactionHash}`);
              });
          }
        }, 5000); // Check every 5 seconds
      }
    } catch (error) {
      console.error('Error Request and Mint:', error);
    }
  }

  async function fetchData() {
    try {
      const metadataResponse = await fetchRegularPackTokenMetadata(id);
      const metadataObject = JSON.parse(metadataResponse);

      const metadataUrl = metadataObject.metadata;
      if (metadataUrl) {
        const response = await fetch(metadataUrl);
        const metadata = await response.json();

        setPackDetails((prevPackDetails) => [
          ...prevPackDetails,
          {
            description: metadata.description || '',
            properties: metadata.properties || { properties: [] },
            image: metadata.image || '',
            name: metadata.name || '',
          },
        ]);
        console.log(packDetails);
        setHasFetchedData(true); // Mark that data has been fetched
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
      alert('Error Fetching metadata: Pack metadata does not exist');
      router.push('/Packs');
    }
  }

  async function isTokenOwner() {
    try {
      const owner = await checkTokenOwner(wallet, id);

      console.log(Number(owner));
      setIsOwner(Number(owner));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    isTokenOwner();
    if (hasFetchedData === false) {
      //fetchData();
    }
    console.log(packDetails);
  }, [hasFetchedData]);

  useEffect(() => {
    if (isOwner === 0) {
      alert("Pack token doesn't exist on this account. Returning to Packs Page");
      router.push('/Packs');
    }
  }, [isOwner]);

  return (
    <Container activeName="PACKS">
      <div className="md:ml-6 mt-12">
        {/* <BackFunction prev={query.origin ? `/${query.origin}` : '/Packs'}></BackFunction> */}
      </div>
      <div className="flex flex-col w-full overflow-y-auto h-screen pb-40">
        <div className="flex flex-row md:ml-24 iphone5:ml-4 md:mt-10 iphone5:mt-20">
          <div>
            {packDetails.map((x) => {
              return <Image src={x.image} height="200" width="200" alt="pack-image" />;
            })}
          </div>
          <div className="grid grid-rows">
            <div className="iphone5:text-base md:text-2xl font-bold font-monument">
              {myPack.sport + ' ' + myPack.packName}
              <hr className="w-10 border-4"></hr>
            </div>
            <div className="md:text-lg iphone5:text-sm md:h-10 iphone5:h-5 font-bold">
              #{myPack.id}
            </div>
            <div className="text-sm">RELEASE 1</div>
            {isOwner ? (
              <button
                className="bg-indigo-buttonblue text-indigo-white w-5/6 md:w-80 h-10 text-center font-bold text-sm mt-4"
                onClick={() => requestAndMint()}
              >
                OPEN PACK
              </button>
            ) : (
              ' '
            )}

            {/* <Link
              href={`/TransferPack/${myPack.sport.toLowerCase()}/${encodeURIComponent(id)}/`}
              passHref
            >
              <button
                className={`${
                  myPack.id.startsWith('SB') ? 'hidden' : ' '
                }bg-indigo-buttonblue text-indigo-white w-5/6 md:w-80 h-10 text-center font-bold text-sm mt-4 `}
              >
                TRANSFER PACK
              </button>
            </Link> */}
          </div>
        </div>
        <div className="ml-8 md:ml-28 mt-10">
          <div className="text-2xl font-bold font-monument ">
            PACK DETAILS
            <hr className="w-10 border-4"></hr>
          </div>
          {query.sport.toString().toUpperCase() === 'FOOTBALL' ? (
            <div className="mt-10">
              This pack will contain 8 randomly generated <br></br>
              American Football players.
            </div>
          ) : query.sport.toString().toUpperCase() === 'BASKETBALL' ? (
            <div className="mt-10">
              This pack will contain 8 randomly generated <br></br>
              American Basketball players.
            </div>
          ) : query.sport.toString().toUpperCase() === 'BASEBALL' ? (
            <div className="mt-10">
              This pack will contain 10 randomly generated <br></br>
              American Baseball players.
            </div>
          ) : (
            <div className="mt-10">
              This pack will contain 12 randomly generated <br></br>
              Cricket players.
            </div>
          )}
          <div className="mt-5 mb-12">
            {query.sport.toString().toUpperCase() === 'BASEBALL' ? (
              <div className="mb-5">An amount for each of the positions below:</div>
            ) : (
              <div className="mb-5">1 for each of the positions below:</div>
            )}
            {query.sport.toString().toUpperCase() === 'FOOTBALL' ? (
              <ul className="marker list-disc pl-5 space-y-3 ">
                <li>1 Quarter Back (QB)</li>
                <li>2 Running Back (RB) </li>
                <li>2 Wide Receivers (WR) </li>
                <li>1 Tight End (TE)</li>
                <li>1 Flex (RB/WR/TE) </li>
                <li>1 Super Flex (QB/RB/WR/TE) </li>
              </ul>
            ) : query.sport.toString().toUpperCase() === 'BASKETBALL' ? (
              <ul className="marker list-disc pl-5 space-y-3 ">
                <li>1 Point Guard (PG)</li>
                <li>1 Shooting Guard (SG) </li>
                <li>1 Small Forward (SF) </li>
                <li>1 Power Forward (PF)</li>
                <li>1 Center (C) </li>
                <li>1 Guard (PG/SG) </li>
                <li>1 Forward (SF/PF) </li>
                <li>1 Any (ANY) </li>
              </ul>
            ) : query.sport.toString().toUpperCase() === 'BASEBALL' ? (
              <ul className="marker list-disc pl-5 space-y-3 ">
                <li>2 Pitchers (P)</li>
                <li>1 Catcher (C)</li>
                <li>1 First Baseman (1B) </li>
                <li>1 Second Baseman (2B)</li>
                <li>1 Third Baseman (3B)</li>
                <li>1 Shortstop (SS) </li>
                <li>2 Outfielder (OF) </li>
                <li>1 Designated Hitter (DH) </li>
              </ul>
            ) : (
              //Ask for the amount for each position
              <ul className="marker list-disc pl-5 space-y-3 ">
                <li>2 Bowlers (BOWL)</li>
                <li>1 Wicket Keeper (WK) </li>
                <li>2 Batsman (BAT) </li>
                <li>2 All rounders (AR)</li>
                <li>5 Any (BOWL/WK/BAT/AR)</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  if (query) {
    if (query.transactionHashes) {
      return {
        redirect: {
          destination: query.origin || `/TokenDrawPage/${query.transactionHashes}`,
          permanent: false,
        },
      };
    } else if (!query.id) {
      return {
        redirect: {
          destination: query.origin || '/Packs',
          permanent: false,
        },
      };
    }
  }

  return {
    props: { query },
  };
}
