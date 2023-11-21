import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPageDark from '../../components/loading/LoadingPageDark';
import Container from '../../components/containers/Container';
import HeaderBase from '../../components/headers/HeaderBase';
import Navbar from '../../components/navbars/Navbar';
import TokenComponent from '../../components/TokenComponent';
import Main from '../../components/Main';
import { useRouter } from 'next/router';
import 'regenerator-runtime/runtime';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { transactions, utils, WalletConnection, providers } from 'near-api-js';
import { getRPCProvider, getContract } from 'utils/near';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import { decode } from 'js-base64';
import { useLazyQuery, useQuery } from '@apollo/client';
import client from 'apollo-client';
import {
  getAthleteInfoById,
  convertNftToAthlete,
  getCricketAthleteInfoById,
  convertPolygonNftToAthlete,
  getAthleteInfoByApiId,
  getAthleteInfoByApiIdTokenDraw,
} from 'utils/athlete/helper';
import {
  SPORT_NAME_LOOKUP,
  SPORT_CONTRACT_LOOKUP,
  SPORT_TYPES,
} from 'data/constants/sportConstants';
import { query_nft_tokens_for_owner } from 'utils/near/helper';
import { query_nft_tokens_by_id } from 'utils/near/helper';
import Web3 from 'web3';
import { GET_ATHLETE_BY_ID } from 'utils/queries';
import { ATHLETE_NFL_POLYGON } from 'data/constants/polygonContracts';
import { getConfig } from 'utils/polygon';

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

  const dispatch = useDispatch();
  const footballContract = ATHLETE_NFL_POLYGON[getConfig()].logic;
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

  // const router = useRouter();
  // const { transactionHash } = router.query;

  const processTransactionAndAthletes = useCallback(async () => {
    //temporary way to get transcation hash router.query is not loading on page load fast enough
    const url = window.location.href;
    const parts = url.split('/');
    const transactionHash = parts[parts.length - 1];
    const web3 = new Web3(window.ethereum);

    const receipt = await web3.eth.getTransactionReceipt(transactionHash);
    let logs = receipt.logs;

    console.log(receipt);
    if (logs[10].address === footballContract) {
      let success = receipt.status;
      if (success === BigInt('1')) {
        const footballFile = fileList.find((file) => file.name === SPORT_NAME_LOOKUP.football);
        setVideoFile(footballFile.base);
        setRemountComponent(Math.random());
      }

      const athleteDataArray = logs.slice(0, 8).map((log) => {
        // Extract the data field
        let data = log.data;

        // Check if data is a string
        if (typeof data === 'string') {
          // Remove the '0x' from the start
          let cleanHexString = data.slice(2);
          let topicHex = log.topics[1].toString().slice(2);
          // Convert the hex string to ASCII
          let asciiString = '';
          for (let j = 0; j < cleanHexString.length; j += 2) {
            asciiString += String.fromCharCode(parseInt(cleanHexString.substr(j, 2), 16));
          }

          // Remove non-ASCII characters
          asciiString = asciiString.replace(/[^\x20-\x7E]/g, '');
          // Trim leading and trailing whitespaces
          asciiString = asciiString.trim();
          try {
            return JSON.parse(
              JSON.stringify({
                tokenId: parseInt(topicHex, 16),
                metadata: JSON.parse(asciiString),
              })
            ); //JSON.parse(asciiString);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
          }
        }
      });

      console.log(athleteDataArray);
      // const athleteInfoPromises = athletes.map((item) => getAthleteInfoByApiId(item, null, null));
      // const athleteInfo = await Promise.all(athleteInfoPromises);
      const athleteInfos = await Promise.all(
        athleteDataArray.map((item) => getAthleteInfoByApiIdTokenDraw(item))
      );

      console.log('Athletes infos');
      console.log(athleteInfos);
      setAthletes(athleteInfos);

      setLoading(false);
    } else {
      console.log(logs[0]);
      let success = receipt.status;
      if (success === BigInt('1')) {
        const footballFile = fileList.find((file) => file.name === SPORT_NAME_LOOKUP.football);
        setVideoFile(footballFile.base);
        setRemountComponent(Math.random());
      }

      const athleteDataArray = logs.slice(0, 8).map((log) => {
        // Extract the data field
        let data = log.data;

        // Check if data is a string
        if (typeof data === 'string') {
          // Remove the '0x' from the start
          let cleanHexString = data.slice(2);
          let topicHex = log.topics[1].toString().slice(2);
          // Convert the hex string to ASCII
          let asciiString = '';
          for (let j = 0; j < cleanHexString.length; j += 2) {
            asciiString += String.fromCharCode(parseInt(cleanHexString.substr(j, 2), 16));
          }
          // Remove non-ASCII characters
          asciiString = asciiString.replace(/[^\x20-\x7E]/g, '');
          // Trim leading and trailing whitespaces
          asciiString = asciiString.trim();

          // Check and remove unexpected characters before parsing
          const openingBraceIndex = asciiString.indexOf('{');
          if (openingBraceIndex > 0) {
            asciiString = asciiString.substring(openingBraceIndex);
          }

          try {
            return JSON.parse(
              JSON.stringify({
                tokenId: parseInt(topicHex, 16),
                metadata: JSON.parse(asciiString),
              })
            ); //JSON.parse(asciiString);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
          }
        }
      });

      console.log(athleteDataArray);
      // const athleteInfoPromises = athletes.map((item) => getAthleteInfoByApiId(item, null, null));
      // const athleteInfo = await Promise.all(athleteInfoPromises);
      const athleteInfos = await Promise.all(
        athleteDataArray.map((item) => getAthleteInfoByApiIdTokenDraw(item))
      );

      console.log('Athletes infos');
      console.log(athleteInfos);
      setAthletes(athleteInfos);

      setLoading(false);
    }
  }, [length]);

  useEffect(() => {
    console.log('test');
    processTransactionAndAthletes().catch(console.error);
  }, [processTransactionAndAthletes]);
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

  // const { accountId } = useWalletSelector();

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
                        animation={data.animation}
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
                    <div className="mb-10">
                      <div>{tokenRevealPage()}</div>
                      <div className="flex h-14 mt-16">
                        <div className="w-full justify-end"></div>
                        <Link href="/Portfolio" replace>
                          <button className="bg-indigo-buttonblue cursor-pointer text-indigo-white w-5/6 md:w-80 h-14 text-center font-bold text-md">
                            GO TO MY SQUAD
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </Main>
          {/* <div>{athletes}</div> */}
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
