import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPageDark from '../../components/loading/LoadingPageDark';
import Container from '../../components/containers/Container';
import HeaderBase from '../../components/headers/HeaderBase';
import Navbar from '../../components/navbars/Navbar';
import TokenComponent from '../../components/TokenComponent';
import Main from '../../components/Main';
import { ethers } from 'ethers';
import openPack from 'utils/polygonContracts/contractABI/openpack.json';
import { useRouter } from 'next/router';
import 'regenerator-runtime/runtime';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { transactions, utils, WalletConnection, providers } from 'near-api-js';
import { getRPCProvider, getContract, getConfig } from 'utils/near';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import { decode } from 'js-base64';
import { useLazyQuery, useQuery } from '@apollo/client';
import client from 'apollo-client';
import {
  getAthleteInfoById,
  convertNftToAthlete,
  getCricketAthleteInfoById,
} from 'utils/athlete/helper';
import { GET_ATHLETE_BY_ID } from 'utils/queries';
import {
  SPORT_NAME_LOOKUP,
  SPORT_CONTRACT_LOOKUP,
  SPORT_TYPES,
} from 'data/constants/sportConstants';
import { query_nft_tokens_for_owner } from 'utils/near/helper';
import { query_nft_tokens_by_id } from 'utils/near/helper';
interface responseExperimentalTxStatus {
  receipts: Array<receipt>;
}

interface receipt {
  receipt: {
    Action: {
      actions: Array<{
        FunctionCall: {
          args: string;
        };
      }>;
    };
  };
}

const TokenDrawPage = (props) => {
  const { query, result } = props;
  const [tokenId, setTokenId] = useState(0);
  const dispatch = useDispatch();
  const [getAthleteById] = useLazyQuery(GET_ATHLETE_BY_ID);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [sport, setSport] = useState('');
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(8);
  const [assets, setassets] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [remountComponent, setRemountComponent] = useState(0);
  const [fileList, setFileList] = useState([
    {
      name: SPORT_NAME_LOOKUP.football,
      base: '/videos/NFL_BASE.mp4',
      promo: '/videos/NFL_PROMO.mp4',
      soulbound: '/videos/NFL_SB.mp4',
    },
    {
      name: SPORT_NAME_LOOKUP.basketball,
      base: '/videos/NBA_BASE.mp4',
      promo: '/videos/NBA_PROMO.mp4',
      soulbound: '/videos/NBA_SB.mp4',
    },
    {
      name: SPORT_NAME_LOOKUP.baseball,
      base: '/videos/MLB_BASE.mp4',
      promo: '/videos/MLB_PROMO.mp4',
      soulbound: '/videos/MLB_SB.mp4',
    },
    {
      name: SPORT_NAME_LOOKUP.cricket,
      base: '/videos/CRICKET_BASE.mp4',
      promo: '/videos/CRICKET_PROMO.mp4',
      soulbound: '/videos/CRICKET_SB.mp4',
    },
  ]);
  const [videoFile, setVideoFile] = useState('');

  // async function getReceipt() {
  //   const provider = new ethers.BrowserProvider(window.ethereum, 'any');

  //   // Assume you have a transaction hash
  //   const transactionHash = '0xf72a3fe23b81c106c2027df7b7b81908f4dd4b65f1c1065916d75dd16faddaf8';
  //   const receipt = await provider.waitForTransaction(transactionHash);
  //   const logData = receipt.logs.map((log) => {
  //     const data = ethers.keccak256(logData);
  //     console.log(data);
  //     return JSON.parse(data);
  //   });
  // }

  // getReceipt();

  const router = useRouter();
  const { transactionHash } = router.query;
  const transactionHashAsString = Array.isArray(transactionHash)
    ? transactionHash[0]
    : (transactionHash as string);

  async function getReceipt() {
    const provider = new ethers.BrowserProvider(window.ethereum, 'any');
    const receipt = await provider.waitForTransaction(transactionHashAsString);
    const success = receipt.status;
    console.log(success);
    const logData = receipt.logs.map((log) => log.data);

    const logDataSlice = logData.slice(0, 8);

    const athletesData = [];

    logDataSlice.forEach((data) => {
      // Remove the '0x' prefix
      const hexData = data.slice(2);
      // Convert the hexadecimal data to a Buffer
      const buffer = Buffer.from(hexData, 'hex');
      // Convert the Buffer to a string
      let str = buffer.toString('utf8');
      // Remove non-printable ASCII characters
      str = str.replace(/[^\x20-\x7E]/g, '');

      const json = JSON.parse(str);
      const name = json.name;
      const image = json.image;
      const symbol = json.properties.symbol;
      const position = json.properties.position;
      const tokenId = json.properties.athleteId;
      // setToken(tokenId);
      athletesData.push({ name, image, symbol, position, isOpen: false, tokenId });
    });

    setAthletes(athletesData);
  }

  useEffect(() => {
    getReceipt();
  }, []);
  function findContract(contract) {
    if (contract.includes(SPORT_CONTRACT_LOOKUP.football)) {
      setLength(8);
      return fileList.find((x) => x.name === SPORT_NAME_LOOKUP.football);
    } else if (contract.includes(SPORT_CONTRACT_LOOKUP.basketball)) {
      setLength(8);
      return fileList.find((x) => x.name === SPORT_NAME_LOOKUP.basketball);
    } else if (contract.includes(SPORT_CONTRACT_LOOKUP.baseball)) {
      setLength(10);
      return fileList.find((x) => x.name === SPORT_NAME_LOOKUP.baseball);
    } else if (contract.includes(SPORT_CONTRACT_LOOKUP.cricket)) {
      setLength(12);
      return fileList.find((x) => x.name === SPORT_NAME_LOOKUP.cricket);
    }
  }

  const { accountId } = useWalletSelector();

  // const query_transaction_testnet = useCallback(async () => {
  //   const queryFromNear = await provider.sendJsonRpc<responseExperimentalTxStatus>(
  //     'EXPERIMENTAL_tx_status',
  //     [query.transactionHash, accountId]
  //   );
  //   //@ts-ignore:next-line
  //   //get the last transaction to check if token was transferred successfully
  //   const txResult = queryFromNear.receipts_outcome[queryFromNear.receipts_outcome.length - 1];
  //   console.log(queryFromNear);
  //   //@ts-ignore:next-line
  //   const success = JSON.parse(decode(queryFromNear.status.SuccessValue));
  //   console.log(success);
  //   //get the last transaction that holds the token_id needed
  //   const txObject = queryFromNear.receipts[queryFromNear.receipts.length - 3];
  //   //@ts-ignore:next-line
  //   let contract = txObject.receiver_id;
  //   console.log(contract);
  //   if (contract.includes('pack.pack_minter')) {
  //     contract = 'pack.nfl.playible.testnet';
  //   }
  //   if (success) {
  //     const args = JSON.parse(decode(txObject.receipt.Action.actions[0].FunctionCall.args));
  //     //for additional checking later for what file to use
  //     const isPromoContract = contract.toString().includes('promotional');

  //     if (isPromoContract) {
  //       await query_nft_tokens_by_id(args.token_id, contract).then((token) => {
  //         //@ts-ignore:next-line
  //         const pack = JSON.parse(Buffer.from(token.result));
  //         const attribute = JSON.parse(pack.metadata.extra);
  //         let isPromo = false;
  //         console.log(attribute);

  //         switch (attribute.attributes[0].value) {
  //           case '1': //promotional, one-time use token
  //             isPromo = true;
  //             break;
  //           case '2': //soulbound token
  //             isPromo = false;
  //             break;
  //         }
  //         setVideoFile(isPromo ? findContract(contract).promo : findContract(contract).soulbound);
  //       });
  //     } else {
  //       setVideoFile(findContract(contract).base);
  //     }

  //     //await query_nft_tokens_for_owner(args.receiver_id, )
  //     setRemountComponent(Math.random());
  //   }

  //   // See https://docs.near.org/api/rpc/transactions
  //   if (contract.includes(SPORT_CONTRACT_LOOKUP.cricket)) {
  //     setAthletes(
  //       await Promise.all(
  //         // filter out all receipts, and find those that array of 8 actions (since 8 nft_mints)
  //         queryFromNear.receipts
  //           .filter((item) => {
  //             return item.receipt.Action.actions.length == length;
  //           })[0]
  //           // decode the arguments of nft_mint, and determine the json
  //           .receipt.Action.actions.map((item) => {
  //             return JSON.parse(decode(item.FunctionCall.args));
  //           })
  //           // get metadata
  //           .map(convertNftToAthlete)
  //           .map((item) => getCricketAthleteInfoById(item, null, null))
  //       )
  //     );
  //   } else {
  //     setAthletes(
  //       await Promise.all(
  //         // filter out all receipts, and find those that array of 8 actions (since 8 nft_mints)
  //         queryFromNear.receipts
  //           .filter((item) => {
  //             return item.receipt.Action.actions.length == length;
  //           })[0]
  //           // decode the arguments of nft_mint, and determine the json
  //           .receipt.Action.actions.map((item) => {
  //             return JSON.parse(decode(item.FunctionCall.args));
  //           })
  //           // get metadata
  //           .map(convertNftToAthlete)
  //           .map((item) => getAthleteInfoById(item, null, null))
  //       )
  //     );
  //   }
  //   setLoading(false);
  // }, [length]);

  // const query_transaction_mainnet = useCallback(async () => {
  //   const queryFromNear = await provider.sendJsonRpc<responseExperimentalTxStatus>(
  //     'EXPERIMENTAL_tx_status',
  //     [query.transactionHash, accountId]
  //   );
  //   //@ts-ignore:next-line
  //   //get the last transaction to check if token was transferred successfully
  //   console.log(queryFromNear);
  //   //@ts-ignore:next-line
  //   const success = JSON.parse(decode(queryFromNear.status.SuccessValue));
  //   console.log(success);
  //   //get the last transaction that holds the token_id needed
  //   const txObject = queryFromNear.receipts[queryFromNear.receipts.length - 3];
  //   //@ts-ignore:next-line
  //   let contract = txObject.receiver_id;
  //   if (contract.includes('pack.pack_minter')) {
  //     contract = 'pack.nfl.playible.near';
  //   }
  //   if (success) {
  //     const args = JSON.parse(decode(txObject.receipt.Action.actions[0].FunctionCall.args));
  //     //for additional checking later for what file to use
  //     const isPromoContract = contract.toString().includes('promotional');

  //     if (isPromoContract) {
  //       await query_nft_tokens_by_id(args.token_id, contract).then((token) => {
  //         //@ts-ignore:next-line
  //         const pack = JSON.parse(Buffer.from(token.result));
  //         const attribute = JSON.parse(pack.metadata.extra);
  //         let isPromo = false;
  //         console.log(attribute);

  //         switch (attribute.attributes[0].value) {
  //           case '1': //promotional, one-time use token
  //             isPromo = true;
  //             break;
  //           case '2': //soulbound token
  //             isPromo = false;
  //             break;
  //         }
  //         setVideoFile(isPromo ? findContract(contract).promo : findContract(contract).soulbound);
  //       });
  //     } else {
  //       setVideoFile(findContract(contract).base);
  //     }
  //     //await query_nft_tokens_for_owner(args.receiver_id, )f
  //     setRemountComponent(Math.random());
  //   }

  //   // See https://docs.near.org/api/rpc/transactions
  //   if (contract.includes(SPORT_CONTRACT_LOOKUP.cricket)) {
  //     setAthletes(
  //       await Promise.all(
  //         // filter out all receipts, and find those that array of 8 actions (since 8 nft_mints)
  //         queryFromNear.receipts
  //           .filter((item) => {
  //             return item.receipt.Action.actions.length == length;
  //           })[0]
  //           // decode the arguments of nft_mint, and determine the json
  //           .receipt.Action.actions.map((item) => {
  //             return JSON.parse(decode(item.FunctionCall.args));
  //           })
  //           // get metadata
  //           .map(convertNftToAthlete)
  //           .map((item) => getCricketAthleteInfoById(item, null, null))
  //       )
  //     );
  //   } else {
  //     setAthletes(
  //       await Promise.all(
  //         // filter out all receipts, and find those that array of 8 actions (since 8 nft_mints)
  //         queryFromNear.receipts
  //           .filter((item) => {
  //             return item.receipt.Action.actions.length == length;
  //           })[0]
  //           // decode the arguments of nft_mint, and determine the json
  //           .receipt.Action.actions.map((item) => {
  //             return JSON.parse(decode(item.FunctionCall.args));
  //           })
  //           // get metadata
  //           .map(convertNftToAthlete)
  //           .map((item) => getAthleteInfoById(item, null, null))
  //       )
  //     );
  //   }
  //   setLoading(false);
  // }, [length]);

  const activeChecker = () => {
    if (athletes.length > 0) {
      const notRevealed = athletes.filter((item) => !item.isOpen);

      if (notRevealed.length > 0) {
        return true;
      } else {
        false;
      }
    } else {
      return false;
    }
  };

  const revealAll = () => {
    const tempAthletes = athletes.map((item) => {
      return {
        ...item,
        isOpen: true,
      };
    });

    setAthletes(tempAthletes);
  };

  const changeCard = (position) => {
    if (athletes[position].isOpen === false) {
      const updatedList = [...athletes];
      const updatedAthlete = {
        ...athletes[position],
        isOpen: true,
      };
      updatedList.splice(position, 1, updatedAthlete);
      setAthletes(updatedList);
    }
  };

  // useEffect(() => {
  //   switch (getConfig()) {
  //     case 'mainnet':
  //       query_transaction_mainnet().catch(console.error);
  //       break;
  //     case 'testnet':
  //       query_transaction_testnet().catch(console.error);
  //       break;
  //   }
  // }, [query_transaction_mainnet, query_transaction_testnet]);

  const onVideoEnded = () => {
    setVideoPlaying(false);
  };

  useEffect(() => {
    if (isMobile) {
      setVideoPlaying(false);
    }
  }, []);

  useEffect(() => {
    console.log(sport);
  }, [sport]);

  const walletConnection = () => {
    return <p className="ml-12 mt-5">{'Waiting for wallet connection...'}</p>;
  };

  const error = () => {
    return <p className="ml-12 mt-5">{'Transaction encountered error.'}</p>;
  };

  const tokenRevealPage = () => {
    return (
      <>
        {athletes.length > 0 && activeChecker() && (
          <div className="flex justify-center my-2 w-full">
            <button
              className="bg-indigo-buttonblue cursor-pointer text-indigo-white w-5/6 md:w-80 h-14 text-center font-bold text-md uppercase"
              onClick={revealAll}
            >
              Reveal all
            </button>
          </div>
        )}
        <div className="flex justify-center self-center" style={{ backgroundColor: 'white' }}>
          <div className="flex flex-row flex-wrap justify-center">
            {athletes.length > 0
              ? athletes.map((data, key) => (
                  <div className="flex px-14 py-10 m-10" key={key}>
                    <div
                      onClick={() => {
                        changeCard(key);
                      }}
                    >
                      <TokenComponent
                        athlete_id={data.athlete_id}
                        position={data.position}
                        release={data.release}
                        rarity={data.rarity}
                        team={data.team}
                        usage={data.usage}
                        name={data.name}
                        isOpen={data.isOpen}
                        img={data.image}
                      />
                    </div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </>
    );
  };
  //"/videos/starter-pack-white.mp4"
  return (
    <>
      <Container activeName="SQUAD">
        <div className="flex flex-col w-full overflow-y-auto h-screen justify-center self-center md:pb-12">
          <Main color="indigo-white">
            {videoPlaying ? (
              <div key={remountComponent} className="player-wrapper">
                <video className="open-pack-video" autoPlay muted onEnded={onVideoEnded}>
                  <source src={videoFile} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
            ) : (
              <>
                {loading ? (
                  <LoadingPageDark />
                ) : (
                  <>
                    {!result ? (
                      error()
                    ) : (
                      <div className="mb-10">
                        <div>{!accountId ? walletConnection() : tokenRevealPage()}</div>
                        <div className="flex h-14 mt-16">
                          <div className="w-full justify-end"></div>
                          <Link href="/Portfolio" replace>
                            <button className="bg-indigo-buttonblue cursor-pointer text-indigo-white w-5/6 md:w-80 h-14 text-center font-bold text-md">
                              GO TO MY SQUAD
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Main>
        </div>
      </Container>
    </>
  );
};

export default TokenDrawPage;

// export async function getServerSideProps(ctx) {
//   const { query } = ctx;

//   let result = false;

//   if (!query.transactionHash) {
//     return {
//       redirect: {
//         destination: '/Portfolio',
//         permanent: false,
//       },
//     };
//   } else {
//     const provider = new providers.JsonRpcProvider({
//       url: getRPCProvider(),
//     });
//     const transaction = await provider.txStatus(query.transactionHash, 'unnused');
//     // true if successful
//     // false if unsuccessful
//     result = providers.getTransactionLastResult(transaction);
//     // const { accountId } = useWalletSelector();
//     // const txn = useCallback(async () => {
//     //   const fromNear = await provider.sendJsonRpc<responseExperimentalTxStatus>(
//     //     'EXPERIMENTAL_tx_status',
//     //     [query.transactionHash, accountId]
//     //   );
//     //   //@ts-ignore:next-line
//     //   const txResult = fromNear.receipts_outcome[fromNear.receipts_outcome.length - 1];
//     //   const success = JSON.parse(decode(txResult.outcome.status.SuccessValue));
//     //   if(success){
//     //     const txObject = fromNear.receipts[fromNear.receipts.length - 1];
//     //     const contractToQuery = txObject.receiver_id;
//     //     const args = JSON.parse(decode(txObject.receipt.Action.actions[0].FunctionCall.args));

//     //     const isPromoContract = contractToQuery.toString().includes('promotional');
//     //     const packInfo = await query_nft_tokens_for_owner()
//     //   }
//     // }, []);
//   }

//   return {
//     props: { query, result },
//   };
// }
