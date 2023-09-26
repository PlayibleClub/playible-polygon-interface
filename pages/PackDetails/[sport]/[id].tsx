import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTokenMetadata } from 'utils/polygon/ethers';
import Container from 'components/containers/Container';
import 'regenerator-runtime/runtime';
import BackFunction from 'components/buttons/BackFunction';
import Image from 'next/image';
import Link from 'next/link';
import openPack from 'utils/polygonContracts/contractABI/openpack.json';
import { ethers } from 'ethers';

export default function PackDetails(props) {
  const { query } = props;
  const router = useRouter();
  const id = query.id.toString();
  const myPack = {
    packName:
      id.length === 6 || id.includes('SB')
        ? 'SOULBOUND PACK'
        : id.includes('PR')
        ? 'PROMO PACK'
        : 'STARTER PACK',
    id: id,
    sport: query.sport.toString().toUpperCase(),
  };
  const tokenId = 200001;
  const [packDetails, setPackDetails] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const openPackContractAddress = '0x797de2d10Ee96a91495F6B8CC8eD575a79957b08';

  async function requestAndMint() {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const OpenPack = new ethers.Contract(
          openPackContractAddress,
          openPack,
          await provider.getSigner()
        );

        // Request random words
        const requestTransaction = await OpenPack.requestRandomWords();
        console.log('Random words requested successfully');

        // Wait for the transaction to be mined
        await provider.waitForTransaction(requestTransaction.hash);

        // Fetch the lastRequestId
        const lastRequestId = await OpenPack.lastRequestId();
        console.log('Last Request ID:', lastRequestId); // Log the lastRequestId

        // Poll for request status until it's fulfilled
        let loopCount = 0; // Initialize loop counter
        const intervalId = setInterval(async () => {
          loopCount++; // Increment loop counter
          console.log('Checking request status...', loopCount); // Log each loop iteration
          let requestStatus = await OpenPack.getRequestStatus(lastRequestId);
          if (requestStatus.fulfilled) {
            clearInterval(intervalId);
            // Once the request is fulfilled, mint the batch
            const mintTransaction = await OpenPack.mintBatch();
            console.log('Batch minted successfully');
            console.log(mintTransaction.hash, 'mint transaction hash');

            // Use client-side routing to navigate to TokenDrawPage
            router.push(`/TokenDrawPage/${mintTransaction.hash}`);
          }
        }, 5000); // Check every 5 seconds
      }
    } catch (error) {
      console.error('Error in request and mint process:', error);
    }
  }

  async function fetchData() {
    try {
      const metadataResponse = await fetchTokenMetadata(tokenId);
      const metadataObject = JSON.parse(metadataResponse);

      const metadataUrl = metadataObject.metadata;
      if (metadataUrl) {
        const response = await fetch(metadataUrl);
        const metadata = await response.json();

        setPackDetails((prevPackDetails) => [
          ...prevPackDetails,
          {
            description: metadata.description || '',
            extra: metadata.extra || { attributes: [] },
            image: metadata.image || '',
            name: metadata.name || '',
          },
        ]);
        console.log(packDetails);
        setHasFetchedData(true); // Mark that data has been fetched
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  }

  useEffect(() => {
    if (hasFetchedData === false) {
      fetchData();
    }
    console.log(packDetails);
  }, [tokenId, hasFetchedData]);

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
            <button
              className="bg-indigo-buttonblue text-indigo-white w-5/6 md:w-80 h-10 text-center font-bold text-sm mt-4"
              onClick={() => requestAndMint()}
            >
              OPEN PACK
            </button>

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
