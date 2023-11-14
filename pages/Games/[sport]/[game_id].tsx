import Container from 'components/containers/Container';
import PortfolioContainer from 'components/containers/PortfolioContainer';
import BackFunction from 'components/buttons/BackFunction';
import ModalPortfolioContainer from 'components/containers/ModalPortfolioContainer';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Main from 'components/Main';
import client from 'apollo-client';
import { getRPCProvider } from 'utils/near';
import LeaderboardComponent from '../components/LeaderboardComponent';
import ViewTeamsContainer from 'components/containers/ViewTeamsContainer';

import { mapGameInfo } from 'utils/game/helper';
import {
  fetchGame,
  fetchTeamsJoinedInGame,
  computeScores,
  fetchPlayerTeams,
  buildLeaderboard,
} from 'utils/polygon/helper/gamePolygon';
import {
  GET_LEADERBOARD_TEAMS,
  GET_GAME_BY_GAME_ID_AND_CHAIN,
  CHECK_IF_GAME_EXISTS_IN_MULTI_CHAIN_LEADERBOARD,
  GET_MULTI_CHAIN_LEADERBOARD_TEAMS,
} from 'utils/queries';
import { getNflWeek, getNflSeason, formatToUTCDate } from 'utils/date/helper';
import LoadingPageDark from 'components/loading/LoadingPageDark';
import { useDispatch } from 'react-redux';
import { persistor } from 'redux/athlete/store';
import { getSportType, SPORT_NAME_LOOKUP } from 'data/constants/sportConstants';
import moment, { Moment } from 'moment';
import Modal from 'components/modals/Modal';
import { providers } from 'near-api-js';
import EntrySummaryPopup from '../components/EntrySummaryPopup';
import EntrySummaryModal from 'components/modals/EntrySummaryModal';
import PerformerContainer from 'components/containers/PerformerContainer';
const Games = (props) => {
  const { query } = props;
  const [currentIndex, setCurrentIndex] = useState(null);
  const gameId = query.game_id;
  const currentSport = query.sport.toString().toUpperCase();
  const router = useRouter();
  const dispatch = useDispatch();
  const [playerLineups, setPlayerLineups] = useState([]);
  const [leaderboardLineups, setLeaderboardLineups] = useState([]);
  const provider = new providers.JsonRpcProvider({ url: getRPCProvider() });
  const {
    state: { wallet },
  } = useWalletSelector();
  const [playerTeams, setPlayerTeams] = useState([]);
  const [playerTeamSorted, setPlayerTeamSorted] = useState([]);
  const [gameInfo, setGameInfo] = useState({});
  const [week, setWeek] = useState(0);
  const [nflSeason, setNflSeason] = useState('');
  const [gameData, setGameData] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [entryModal, setEntryModal] = useState(false);
  const [isExtendedLeaderboard, setIsExtendedLeaderboard] = useState(0);
  const playGameImage = '/images/game.png';
  async function get_game_data(game_id) {
    const result = await fetchGame(gameId);
    const game = await mapGameInfo(result, 'games', currentSport);
    setGameInfo(game);
    setGameData(game);
    //setGameInfo(await fetchGame(gameId));
    //setGameData(await query_game_data(game_id, getSportType(currentSport).gameContract));
  }

  const togglePopup = (item) => {
    console.log(item);
    setViewModal(false);
    setEntryModal(true);
    setCurrentIndex(item.index);
  };

  const viewPopup = (accountId, teamName) => {
    const currentIndex = playerLineups.findIndex(
      (item) => item.accountId.toLowerCase() === accountId && item.teamName === teamName
    );
    setViewModal(false);
    setEntryModal(true);
    setCurrentIndex(currentIndex);
  };

  async function getLeaderboard(id) {
    const { data } = await client.query({
      query: CHECK_IF_GAME_EXISTS_IN_MULTI_CHAIN_LEADERBOARD,
      variables: {
        chain: 'polygon',
        sport: getSportType(currentSport).key.toLowerCase(),
        gameId: parseFloat(id),
      },
    });
    console.log(data.checkIfGameExistsInMultiChainLeaderboard);
    let isMulti = data.checkIfGameExistsInMultiChainLeaderboard;
    let dbArray;
    if (isMulti) {
      const { data } = await client.query({
        query: GET_MULTI_CHAIN_LEADERBOARD_TEAMS,
        variables: {
          contract: 'polygon',
          sport: 'nfl',
          gameId: parseFloat(id),
        },
      });
      console.log('multi-chain');
      console.log(data);
      dbArray = data.getMultiChainLeaderboardTeams;
    } else {
      const { data } = await client.query({
        query: GET_LEADERBOARD_TEAMS,
        variables: {
          contract: 'polygon',
          sport: 'nfl',
          gameId: parseFloat(gameId),
        },
      });
      console.log(data);
      dbArray = data.getLeaderboardTeams;
    }

    const startTimeFormatted = formatToUTCDate(gameData.start_time);
    const endTimeFormatted = formatToUTCDate(gameData.end_time);
    const playerLineups = await fetchTeamsJoinedInGame(gameId);
    const mergedArrays = dbArray.map((item) => ({
      ...item,
      ...playerLineups.find(
        (newItem) =>
          newItem.teamName === item.team_name &&
          newItem.playerAddr.toLowerCase() == item.wallet_address.toLowerCase()
      ),
    }));
    console.log(mergedArrays);
    console.log(playerLineups);

    const computedLineups = await buildLeaderboard(
      mergedArrays,
      currentSport,
      startTimeFormatted,
      endTimeFormatted,
      gameId,
      id,
      isMulti
    );

    console.log(computedLineups);
    // let computedLineup = await computeScores(
    //   playerLineups,
    //   currentSport,
    //   startTimeFormatted,
    //   endTimeFormatted
    // );
    setPlayerLineups(computedLineups);
  }

  async function getGameInfoFromServer() {
    //get game "id" for the game first
    const { data } = await client.query({
      query: GET_GAME_BY_GAME_ID_AND_CHAIN,
      variables: {
        chain: 'polygon',
        sport: getSportType(currentSport).key.toLowerCase(),
        gameId: parseFloat(gameId.toString()),
      },
    });
    console.log(data);

    getLeaderboard(data.getGameByGameIdAndChain.id);

    //singular game, no merge with other contracts

    // const { data } = await client.query({
    //   query: GET_LEADERBOARD_TEAMS,
    //   variables: {
    //     contract: 'polygon',
    //     sport: 'nfl',
    //     gameId: parseFloat(gameId),
    //   },
    // });
    // console.log(data);
    // let dbArray = data.getLeaderboardTeams;
    // const startTimeFormatted = formatToUTCDate(gameData.start_time);
    // const endTimeFormatted = formatToUTCDate(gameData.end_time);
    // const playerLineups = await fetchTeamsJoinedInGame(gameId);
    // const mergedArrays = dbArray.map((item) => ({
    //   ...item,
    //   ...playerLineups.find(
    //     (newItem) =>
    //       newItem.teamName === item.team_name &&
    //       newItem.playerAddr.toLowerCase() == item.wallet_address.toLowerCase()
    //   ),
    // }));
    // console.log(mergedArrays);
    // console.log(playerLineups);
    // const computedLineups = await buildLeaderboardSingle(
    //   mergedArrays,
    //   currentSport,
    //   startTimeFormatted,
    //   endTimeFormatted,
    //   gameId
    // );
    // console.log(computedLineups);
    // // let computedLineup = await computeScores(
    // //   playerLineups,
    // //   currentSport,
    // //   startTimeFormatted,
    // //   endTimeFormatted
    // // );
    // setPlayerLineups(computedLineups);
    //console.log(computedLineup);
  }

  async function getPlayerTeams() {
    setPlayerTeams(await fetchPlayerTeams(wallet, gameId));
  }

  function getAccountScore(accountId, teamName) {
    const x = playerLineups.findIndex((x) => x.accountId === accountId && x.teamName === teamName);
    return playerLineups[x]?.total.toFixed(2);
  }

  function getAccountPlacement(accountId, teamName) {
    return (
      playerLineups.findIndex(
        (x) => x.accountId.toLowerCase() === accountId && x.teamName === teamName
      ) + 1
    );
  }
  async function get_all_player_keys() {
    const query = JSON.stringify({});
    return await provider
      .query({
        request_type: 'call_function',
        finality: 'optimistic',
        account_id: getSportType(currentSport).gameContract,
        method_name: 'get_player_lineup_keys',
        args_base64: Buffer.from(query).toString('base64'),
      })
      .then(async (data) => {
        //@ts-ignore:next-line
        const result = JSON.parse(Buffer.from(data.result).toString());
        //console.log(result);
        return result;
      });
  }
  function sortPlayerTeamScores(accountId) {
    const x = playerLineups.filter((x) => x.accountId.toLowerCase() === accountId);
    if (x !== undefined) {
      setPlayerTeamSorted(
        x.sort(function (a, b) {
          return b.total - a.total;
        })
      );
    }
  }

  const handleButtonClick = (item) => {
    setIsExtendedLeaderboard(isExtendedLeaderboard + 1);
    setEntryModal(true);
    setCurrentIndex(item.index);
  };
  useEffect(() => {
    if (gameData !== undefined && gameData !== null) {
      getPlayerTeams();
      getGameInfoFromServer();
      // console.log('Joined team counter: ' + gameData.joined_team_counter);
      //get_player_teams(wallet, gameId);
      //get_all_players_lineup_with_index();
      //get_all_players_lineup_rposition(gameData.joined_team_counter);
    }
  }, [gameData]);

  useEffect(() => {
    setTimeout(() => persistor.purge(), 200);
    get_game_data(gameId);
  }, [week]);

  useEffect(() => {
    if (playerLineups !== undefined) {
      sortPlayerTeamScores(wallet);
    }
  }, [playerLineups]);

  return (
    <Container activeName="GAMES">
      <div className="flex flex-col w-full overflow-y-auto h-screen">
        <Main color="indigo-white">
          <div className="iphone5:mt-28 md:mt-8 md:ml-6">
            <BackFunction prev="/Play" />
          </div>
          <div className="flex md:flex-row iphone5:flex-col">
            <div className="md:ml-6 mt-11 flex flex-col w-auto">
              <div className="md:ml-7 md:mr-12 iphone5:mr-6 iphone5:ml-6">
                <Image
                  src={gameData?.game_image ? gameData?.game_image : playGameImage}
                  width={550}
                  height={279}
                  alt="game-image"
                />
              </div>
              <div className="mt-7 ml-6 iphone5:w-5/6 md:w-full md:ml-7 md:mt-2 ">
                <ModalPortfolioContainer title="PRIZE DESCRIPTION" textcolor="text-indigo-black" />
                <div>
                  {gameData?.prize_description
                    ? gameData.prize_description
                    : '$100 + 2 Championship Tickets'}
                </div>
                <ModalPortfolioContainer title="VIEW TEAMS" textcolor="text-indigo-black mb-5" />
                {playerTeams == undefined ? (
                  'No Teams Assigned'
                ) : (
                  <div>
                    {playerTeamSorted.map((data, index) => {
                      return (
                        <ViewTeamsContainer
                          teamNames={data.teamName}
                          gameId={gameId}
                          accountId={wallet}
                          accountScore={getAccountScore(wallet, data.teamName)}
                          accountPlacement={getAccountPlacement(wallet, data.teamName)}
                          fromGames={true}
                          onClickFn={() => {
                            viewPopup(wallet, data.teamName);
                            setIsExtendedLeaderboard(1);
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="iphone5:ml-6 md:ml-18 ml-18 mt-4 md:mr-0 md:mb-0 iphone5:mr-6 iphone5:mb-10">
              <ModalPortfolioContainer textcolor="indigo-black" title={'LEADERBOARD'} />
              <div
                className={`flex justify-end md:mr-1.5 iphone5:mr-2 iphoneX:mr-16 ${
                  playerLineups.length > 0 ? '' : 'hidden'
                }`}
              >
                <button
                  onClick={() => {
                    setViewModal(true);
                  }}
                  className="bg-indigo-black text-indigo-white text-sm font-bold py-2 px-2 relative bottom-12 "
                >
                  <Image
                    className="filter invert"
                    alt="Image of bars for leaderboard"
                    src="/images/bars.png"
                    width={10}
                    height={10}
                  />
                </button>
              </div>
              <div className="relative bottom-5 overflow-y-auto">
                {playerLineups.length > 0 ? (
                  playerLineups.slice(0, 10).map((item, index) => {
                    return (
                      <LeaderboardComponent
                        accountId={item.accountId}
                        teamName={item.teamName}
                        teamScore={item.total}
                        index={index}
                        gameId={gameId}
                        isExtendedLeaderboard={false}
                        onClickFn={() => {
                          togglePopup({ accountId: item.accountId, index: index });
                          setIsExtendedLeaderboard(1);
                        }}
                      />
                    );
                  })
                ) : (
                  <div className="-mt-10 -ml-12">
                    <LoadingPageDark />
                  </div>
                )}
              </div>
              <Modal title={'EXTENDED LEADERBOARD'} visible={viewModal}>
                <div className="md:h-128 h-80 overflow-y-auto">
                  <button
                    className="fixed top-4 right-4 "
                    onClick={() => {
                      setEntryModal(false);
                      setViewModal(false);
                      setIsExtendedLeaderboard(0);
                    }}
                  >
                    <img src="/images/x.png" />
                  </button>
                  {playerLineups.length > 0
                    ? playerLineups.map((item, index) => {
                        return (
                          <LeaderboardComponent
                            accountId={item.accountId}
                            teamName={item.teamName}
                            teamScore={item.total}
                            index={index}
                            gameId={gameId}
                            isExtendedLeaderboard={true}
                            onClickFn={() => {
                              togglePopup({ accountId: item.accountId, index: index });
                              setIsExtendedLeaderboard(0);
                            }}
                          />
                        );
                      })
                    : ''}
                </div>
                <button
                  className="bg-indigo-buttonblue text-indigo-white mt-4 md:mt-10 w-full h-14 text-center tracking-widest text-md font-monument"
                  onClick={() => {
                    setViewModal(false);
                  }}
                >
                  CLOSE
                </button>
              </Modal>

              <EntrySummaryModal title={'ENTRY SUMMARY'} visible={entryModal}>
                <div className=" transform iphone5:scale-55 md:scale-85 md:-mt-6 iphoneX:fixed iphoneX:-mt-6 iphone5:-ml-14 iPhonneX:-ml-20 md:-ml-12 md:static">
                  <ModalPortfolioContainer
                    title={playerLineups[currentIndex]?.teamName}
                    accountId={playerLineups[currentIndex]?.accountId}
                    textcolor="text-indigo-black"
                  />
                </div>
                <div className="h-130 overflow-y-auto overflow-x-hidden">
                  <div className="flex flex-col md:pb-12 ml-24 iphoneX:ml-24 md:ml-20">
                    <div className="grid grid-cols-4 md:gap-6 iphone5:gap-x-20 md:gap-y-4 mb-2 md:mb-10 md:grid-cols-4 md:ml-7 iphone5:mt-12 iphone5:-ml-3 md:mr-0  ">
                      {playerLineups.length === 0
                        ? 'Loading athletes...'
                        : playerLineups[currentIndex]?.lineup.map((item, i) => {
                            return (
                              <EntrySummaryPopup
                                AthleteName={`${item.name}`}
                                AvgScore={item.stats_breakdown?.toFixed(2)}
                                id={item.primary_id}
                                uri={item.image}
                                hoverable={false}
                                isActive={item.isActive}
                                isInjured={item.isInjured}
                              />
                            );
                          })}
                    </div>
                  </div>
                </div>
                <div className="fixed top-4 right-4 transform scale-100">
                  {isExtendedLeaderboard === 1 ? (
                    <button
                      onClick={() => {
                        setEntryModal(false);
                        setViewModal(false);
                        setIsExtendedLeaderboard(0);
                      }}
                    >
                      <img src="/images/x.png" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEntryModal(false);
                        setViewModal(true);
                        setIsExtendedLeaderboard(0);
                      }}
                    >
                      <img src="/images/x.png" />
                    </button>
                  )}
                </div>
              </EntrySummaryModal>
            </div>
          </div>
        </Main>
      </div>
    </Container>
  );
};
export default Games;

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  if (query.game_id != query.game_id) {
    return {
      desination: query.origin || '/Play',
    };
  }

  return {
    props: { query },
  };
}
