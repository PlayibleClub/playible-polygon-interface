import React, { useCallback, useEffect, useState } from 'react';
import { providers } from 'near-api-js';
import { getRPCProvider } from 'utils/near';
import BackFunction from 'components/buttons/BackFunction';
import Container from 'components/containers/Container';
import PortfolioContainer from 'components/containers/PortfolioContainer';
import { useRouter } from 'next/router';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import SearchComponent from 'components/SearchComponent';
import ReactPaginate from 'react-paginate';
import PerformerContainer from 'components/containers/PerformerContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAthleteLineup,
  getGameId,
  getIndex,
  getPosition,
  getSport,
} from 'redux/athlete/athleteSlice';
import { setAthleteLineup, setGameId } from 'redux/athlete/athleteSlice';
import {
  query_filter_supply_for_owner,
  query_filter_tokens_for_owner,
  query_mixed_tokens_pagination,
} from 'utils/near/helper';
import {
  fetchFilteredAthleteSupplyForOwner,
  fetchFilteredAthleteTokensForOwner,
  fetchFilteredMixedTokensForOwner,
} from 'utils/polygon/helper/athletePolygon';
import { getGameStartDate, getGameEndDate } from 'redux/athlete/athleteSlice';
import { getSportType, SPORT_NAME_LOOKUP } from 'data/constants/sportConstants';
import NftTypeComponent from 'pages/Portfolio/components/NftTypeComponent';
import { getAthleteSchedule, getCricketSchedule, getPositionDisplay } from 'utils/athlete/helper';
import { useLazyQuery } from '@apollo/client';
import { GET_CRICKET_TEAMS, GET_TEAMS } from 'utils/queries';
const AthleteSelect = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  //Get the data from redux store
  const gameId = useSelector(getGameId);
  const startDate = useSelector(getGameStartDate);
  const endDate = useSelector(getGameEndDate);
  const position = useSelector(getPosition);
  console.log(position);
  const index = useSelector(getIndex);
  const reduxLineup = useSelector(getAthleteLineup);
  const currentSport = useSelector(getSport);
  let passedLineup = [...reduxLineup];
  const [athletes, setAthletes] = useState([]);
  const [selectedRegular, setSelectedRegular] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(false);
  const [athleteOffset, setAthleteOffset] = useState(0);
  const [promoOffset, setPromoOffset] = useState(0);
  const [isPromoPage, setIsPromoPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [athleteLimit, setAthleteLimit] = useState(7);
  const [totalRegularSupply, setTotalRegularSupply] = useState(0);
  const [totalPromoSupply, setTotalPromoSupply] = useState(0);
  const [radioSelected, setRadioSelected] = useState(null);
  const [team, setTeam] = useState('allTeams');
  const [name, setName] = useState('allNames');
  const [lineup, setLineup] = useState([]);
  const {
    state: { wallet },
  } = useWalletSelector();
  const [pageCount, setPageCount] = useState(0);
  const [regPageCount, setRegPageCount] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);
  const [remountAthlete, setRemountAthlete] = useState(0);
  const [getTeams] = useLazyQuery(GET_TEAMS);
  const [getCricketTeams] = useLazyQuery(GET_CRICKET_TEAMS);
  const [teams, setTeams] = useState([]);

  //TODO: might encounter error w/ loading duplicate athlete
  function setAthleteRadio(radioIndex) {
    passedLineup.splice(index, 1, {
      position: position,
      isAthlete: true,
      // isPromo:
      //   athletes[radioIndex].athlete_id.includes('SB') || //TODO: add differentiation for polygon tokens
      //   athletes[radioIndex].athlete_id.includes('PR')
      //     ? true
      //     : false,
      isPromo:
        athletes[radioIndex].athlete_id.charAt(0) === '2' ||
        athletes[radioIndex].athlete_id.charAt(0) === '3',
      athlete: athletes[radioIndex],
    });
    setLineup(passedLineup);
  }

  function checkIfAthleteExists(athlete_id, primary_id) {
    for (let i = 0; i < passedLineup.length; i++) {
      if (passedLineup[i].isAthlete === true) {
        if (
          athlete_id === passedLineup[i].athlete.athlete_id ||
          primary_id === passedLineup[i].athlete.primary_id
        ) {
          return true;
        }
      }
    }
    return false;
  }
  async function getFilterTokensForOwner(type) {
    const result = await fetchFilteredAthleteTokensForOwner(
      wallet,
      athleteOffset,
      athleteLimit,
      position,
      team,
      name,
      type === 'regular' ? totalRegularSupply : totalPromoSupply,
      type
    );
    console.log(result);
    setAthletes(result);
    // await query_filter_tokens_for_owner(
    //   wallet,
    //   athleteOffset,
    //   athleteLimit,
    //   position,
    //   team,
    //   name,
    //   contract,
    //   currentSport
    // ).then(async (result) => {
    //   let athletes = result;
    //   if (currentSport === SPORT_NAME_LOOKUP.basketball) {
    //     athletes = await Promise.all(
    //       result.map((x) => getAthleteSchedule(x, startDate, endDate, 'nba'))
    //     );
    //   } else if (currentSport === SPORT_NAME_LOOKUP.baseball) {
    //     athletes = await Promise.all(
    //       result.map((x) => getAthleteSchedule(x, startDate, endDate, 'mlb'))
    //     );
    //   } else if (currentSport === SPORT_NAME_LOOKUP.cricket) {
    //     athletes = await Promise.all(
    //       result
    //         .filter((x) => x.status !== 'not_started')
    //         .map((x) => getCricketSchedule(x, startDate, endDate))
    //     );
    //   }
    //   setAthletes(athletes);
    // });
    //   setAthletes(
    //     await query_filter_tokens_for_owner(
    //       accountId,
    //       athleteOffset,
    //       athleteLimit,
    //       position,
    //       team,
    //       name,
    //       contract
    //     )
    //   );
  }
  async function getFilteredTokenSupplyForOwner(type) {
    if (type === 'regular') {
      setTotalRegularSupply(
        await fetchFilteredAthleteSupplyForOwner(wallet, position, team, name, type)
      );
    } else if (type === 'promo') {
      setTotalPromoSupply(
        await fetchFilteredAthleteSupplyForOwner(wallet, position, team, name, type)
      );
    }
  }
  async function get_mixed_tokens_for_pagination() {
    // await query_mixed_tokens_pagination(
    //   wallet,
    //   isPromoPage,
    //   athleteOffset,
    //   promoOffset,
    //   totalPromoSupply,
    //   athleteLimit,
    //   position,
    //   team,
    //   name,
    //   currentSport
    // ).then(async (result) => {
    //   let athletes = result;
    //   if (currentSport === SPORT_NAME_LOOKUP.basketball) {
    //     athletes = await Promise.all(
    //       result.map((x) => getAthleteSchedule(x, startDate, endDate, 'nba'))
    //     );
    //   } else if (currentSport === SPORT_NAME_LOOKUP.baseball) {
    //     athletes = await Promise.all(
    //       result.map((x) => getAthleteSchedule(x, startDate, endDate, 'mlb'))
    //     );
    //   } else if (currentSport === SPORT_NAME_LOOKUP.cricket) {
    //     athletes = await Promise.all(
    //       result
    //         .filter((x) => x.status !== 'not_started')
    //         .map((x) => getCricketSchedule(x, startDate, endDate))
    //     );
    //   }
    //   setAthletes(athletes);
    // });
    await fetchFilteredMixedTokensForOwner(
      wallet,
      isPromoPage,
      athleteOffset,
      promoOffset,
      totalRegularSupply,
      totalPromoSupply,
      athleteLimit,
      position,
      team,
      name,
      currentSport
    ).then((result) => {
      setAthletes(result);
    });
  }
  const mixedPaginationHandling = (e) => {
    let newOffset;
    if (e.selected * athleteLimit >= totalRegularSupply) {
      let offset;
      if (
        athleteLimit - totalRegularSupply < 0 &&
        (athleteLimit - totalRegularSupply) % athleteLimit !== 0
      ) {
        offset = ((athleteLimit - totalRegularSupply) % athleteLimit) + athleteLimit;
      } else offset = (athleteLimit - totalRegularSupply) % athleteLimit;
      let extra = 1;
      newOffset = Math.abs(Math.abs(e.selected - regPageCount + 1) - extra) * athleteLimit;
      setPromoOffset(offset);
      setIsPromoPage(true);
    } else {
      setIsPromoPage(false);
      newOffset = (e.selected * athleteLimit) % totalRegularSupply;
    }
    passedLineup.splice(index, 1, {
      position: position,
      isAthlete: false,
      isPromo: false,
    });

    setRadioSelected(null);
    setAthleteOffset(newOffset);
    setCurrentPage(e.selected);
  };
  function handleDropdownChange() {
    setAthleteOffset(0);
    setAthleteLimit(7);
    setRemountComponent(Math.random());
  }

  async function query_teams_graphql(currentSport) {
    let query;
    console.log(currentSport);
    if (currentSport !== SPORT_NAME_LOOKUP.cricket) {
      query = await getTeams({
        variables: { sport: getSportType(currentSport).key.toLocaleLowerCase() },
      });
      setTeams(await Promise.all(query.data.getTeams));
    } else {
      query = await getCricketTeams({
        variables: { sport: getSportType(currentSport).key.toLocaleLowerCase() },
      });
      setTeams(await Promise.all(query.data.getCricketTeams));
    }
  }

  const handleRadioClick = (value) => {
    setRadioSelected(value);
    setAthleteRadio(value);
  };

  const handleProceedClick = (game_id, lineup) => {
    dispatch(setGameId(game_id));
    dispatch(setAthleteLineup(lineup));
    router.push({
      pathname: '/CreateTeam/[sport]/[game_id]',
      query: { sport: currentSport, game_id: game_id },
    });
  };

  const handlePageClick = (event) => {
    let total = selectedRegular ? totalRegularSupply : selectedPromo ? totalPromoSupply : 0;
    const newOffset = (event.selected * athleteLimit) % total;

    passedLineup.splice(index, 1, {
      position: position,
      isAthlete: false,
      isPromo: false,
    });
    setAthleteOffset(newOffset);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    //if regular and soulbound radio buttons are enabled
    if (selectedRegular !== false && selectedPromo === false) {
      getFilterTokensForOwner('regular');
    } else if (selectedRegular === false && selectedPromo !== false) {
      getFilterTokensForOwner('promo');
    } else if (selectedRegular !== false && selectedPromo !== false) {
      get_mixed_tokens_for_pagination();
    } else {
      setAthletes([]);
    }
  }, [totalRegularSupply, totalPromoSupply, athleteOffset, currentPage]);

  useEffect(() => {
    setAthleteOffset(0);
    setRemountComponent(Math.random());
  }, [selectedRegular, selectedPromo]);

  useEffect(() => {
    setRemountAthlete(Math.random() + 1);
    console.log(athletes);
    console.log('passedLineup:', passedLineup);
  }, [athletes]);
  useEffect(() => {
    if (selectedRegular !== false && selectedPromo === false) {
      getFilteredTokenSupplyForOwner('regular');
      setTotalPromoSupply(0);
    } else if (selectedRegular === false && selectedPromo !== false) {
      getFilteredTokenSupplyForOwner('promo');
      setTotalRegularSupply(0);
    } else if (selectedRegular !== false && selectedPromo !== false) {
      getFilteredTokenSupplyForOwner('regular');
      getFilteredTokenSupplyForOwner('promo');
    } else {
      setTotalRegularSupply(0);
      setTotalPromoSupply(0);
    }
    setRegPageCount(Math.ceil(totalRegularSupply / athleteLimit));
    setPageCount(Math.ceil((totalRegularSupply + totalPromoSupply) / athleteLimit));
    //setup regular_offset, soulbound_offset
  }, [team, name, totalRegularSupply, totalPromoSupply, selectedRegular, selectedPromo, team]);
  useEffect(() => {
    query_teams_graphql(currentSport);
  }, []);

  return (
    <Container activeName="PLAY">
      <div className="mt-44 md:ml-6 md:mt-6 mb-2">
        <BackFunction prev={`/CreateTeam/${currentSport.toLowerCase()}/${gameId}`} />
        <PortfolioContainer
          title={'SELECT YOUR ' + getPositionDisplay(position, currentSport)}
          textcolor="text-indigo-black"
        />
        <div className="flex flex-row-reverse mr-6 md:flex-row justify-between">
          <form className="md:ml-7 md:mt-8">
            <select
              onChange={(e) => {
                handleDropdownChange();
                setTeam(e.target.value);
              }}
              className="bg-filter-icon bg-no-repeat bg-right bg-indigo-white iphone5:w-28 w-36 md:w-60 lg:w-60
                      ring-2 ring-offset-4 ring-indigo-black ring-opacity-25 focus:ring-2 focus:ring-indigo-black 
                      focus:outline-none cursor-pointer text-xs md:text-base"
            >
              <option value="allTeams">ALL TEAMS</option>
              {teams.map((x) => {
                return <option value={x.key}>{x.key.toUpperCase()}</option>;
              })}
            </select>
          </form>
          <div className="">
            <NftTypeComponent
              onChangeFn={(selectedRegular, selectedPromo) => {
                setSelectedRegular(selectedRegular);
                setSelectedPromo(selectedPromo);
                setRemountComponent(Math.random());
              }}
            />
          </div>
        </div>
      </div>

      <div className="h-8 flex absolute ml-6 top-32 mr-8 md:top-24 md:right-20 md:-mt-5 ">
        <SearchComponent
          onChangeFn={(search) => setName(search)}
          onSubmitFn={(search) => setName(search)}
        />
      </div>

      <div key={remountAthlete} className="flex flex-col overflow-y-auto">
        <div className="grid grid-cols-2 mt-1 ml-4 md:grid-cols-4 md:ml-7 md:mt-2">
          {athletes.map((item, i) => {
            const accountAthleteIndex = athletes.indexOf(item, 0) + athleteOffset;
            return (
              <>
                {checkIfAthleteExists(item.athlete_id, item.primary_id) || item.isInGame ? (
                  <div className="w-4/5 h-5/6 border-transparent pointer-events-none">
                    <div className="mt-1.5 w-full h-14px mb-1"></div>
                    <PerformerContainer
                      key={item.athlete_id}
                      AthleteName={item.name}
                      AvgScore={item.fantasy_score.toFixed(2)}
                      id={item.athlete_id}
                      uri={item.image}
                      index={accountAthleteIndex}
                      isSelected={true}
                      isInGame={item.isInGame}
                      fromPortfolio={false}
                      isActive={item.isActive}
                      isInjured={item.isInjured}
                      gameCount={0}
                    />
                  </div>
                ) : (
                  <label className="w-4/5 h-5/6">
                    <div className="w-full h-full border-transparent focus:border-transparent focus:ring-2 focus:ring-blue-300 focus:border-transparent">
                      <input
                        className="justify-self-end"
                        type="radio"
                        checked={radioSelected == i}
                        value={i}
                        onChange={(e) => handleRadioClick(e.target.value)}
                      ></input>
                      <PerformerContainer
                        key={item.athlete_id}
                        AthleteName={item.name}
                        AvgScore={item.fantasy_score.toFixed(2)}
                        id={item.athlete_id}
                        uri={item.image}
                        index={accountAthleteIndex}
                        fromPortfolio={false}
                        isActive={item.isActive}
                        isInjured={item.isInjured}
                        gameCount={0}
                      />
                    </div>
                  </label>
                )}
              </>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-10 right-10"></div>
      <div className="absolute z-0 bottom-10 right-10 iphone5:bottom-4 iphone5:right-2 iphone5:fixed iphoneX:bottom-4 iphoneX:right-4 iphoneX-fixed">
        <div key={remountComponent}>
          <ReactPaginate
            className="p-2 content-center justify-center bg-indigo-buttonblue text-indigo-white flex flex-row space-x-4 select-none ml-7"
            pageClassName="hover:font-bold"
            activeClassName="rounded-lg text-center bg-indigo-white text-indigo-black pr-1 pl-1 font-bold"
            pageLinkClassName="rounded-lg text-center hover:font-bold hover:bg-indigo-white hover:text-indigo-black"
            breakLabel="..."
            nextLabel=">"
            onPageChange={
              selectedRegular !== false && selectedPromo !== false
                ? mixedPaginationHandling
                : handlePageClick
            }
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
          <button
            className="bg-indigo-buttonblue text-indigo-white w-full ml-7 mt-4 md:w-60 h-14 text-center font-bold text-md"
            onClick={() => handleProceedClick(gameId, lineup)}
          >
            PROCEED
          </button>
        </div>
      </div>
    </Container>
  );
};
export default AthleteSelect;

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  if (query.id != query.id) {
    return {
      desination: query.origin || '/CreateTeam',
    };
  }

  return {
    props: { query },
  };
}
