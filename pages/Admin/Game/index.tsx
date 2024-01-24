import React, { useEffect, useState } from 'react';
import Container from '../../../components/containers/Container';
import LoadingPageDark from '../../../components/loading/LoadingPageDark';
import Main from '../../../components/Main';
import BaseModal from '../../../components/modals/BaseModal';
import client from 'apollo-client';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { SPORT_TYPES, getSportType } from 'data/constants/sportConstants';
import 'regenerator-runtime/runtime';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_GAME } from '../../../utils/mutations';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import { AddGameType, mapGameInfo } from 'utils/game/helper';
import AdminGameComponent from './components/AdminGameComponent';
import moment, { utc } from 'moment';
import { getUTCDateFromLocal, getUTCTimestampFromLocal } from 'utils/date/helper';
import { MERGE_INTO_LEADERBOARD, GET_GAME } from 'utils/queries';
import ReactPaginate from 'react-paginate';
import ReactS3Client from 'react-aws-s3-typescript';
import secretKeys from 's3config';
import Modal from 'components/modals/Modal';
import { fetchGameCounter, executeAddGame, fetchAllGames } from 'utils/polygon/helper/gamePolygon';
import { useSelector } from 'react-redux';
import { getIsAdmin } from 'redux/admin/adminSlice';
import AdminGameFilter from './components/AdminGameFiilter';
TimeAgo.addDefaultLocale(en);

export default function Index(props) {
  const [createNewGame, { data, error }] = useMutation(CREATE_GAME);
  const {
    state: { wallet },
  } = useWalletSelector();
  const router = useRouter();
  const isAdmin = useSelector(getIsAdmin);
  const [loading, setLoading] = useState(false);
  const [totalGames, setTotalGames] = useState(0);
  //gameinfo
  const [whitelistInfo, setWhitelistInfo] = useState(null);
  const [gameDescription, setGameDescription] = useState(null);
  const [prizeDescription, setPrizeDescription] = useState(null);
  const [gameImage, setGameImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [radioSelected, setRadioSelected] = useState(null);
  const [s3config, setS3Config] = useState({
    bucketName: '',
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
  });
  const [tabs, setTabs] = useState([
    {
      name: 'GAMES',
      isActive: true,
    },
    {
      name: 'CREATE',
      isActive: false,
    },
    {
      name: 'MERGE',
      isActive: false,
    },
  ]);
  const [gameTabs, setGameTabs] = useState([
    {
      name: 'NEW',
      isActive: true,
    },
    {
      name: 'ON-GOING',
      isActive: false,
    },
    {
      name: 'COMPLETED',
      isActive: false,
    },
  ]);

  const [distribution, setDistribution] = useState([
    {
      rank: 1,
      percentage: 50,
    },
    {
      rank: 2,
      percentage: 30,
    },
    {
      rank: 3,
      percentage: 16,
    },
    {
      rank: 4,
      percentage: 2,
    },
    {
      rank: 5,
      percentage: 2,
    },
    {
      rank: 6,
      percentage: 2,
    },
    {
      rank: 7,
      percentage: 2,
    },
    {
      rank: 8,
      percentage: 2,
    },
    {
      rank: 9,
      percentage: 2,
    },
    {
      rank: 10,
      percentage: 2,
    },
  ]);
  const [newGames, setNewGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [ongoingGames, setOngoingGames] = useState([]);
  const [gamesLimit, setGamesLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [gamesOffset, setGamesOffset] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [endLoading, setEndLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [endModal, setEndModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const [positionsInfo, setPositionsInfo] = useState([
    { positions: ['QB'], amount: 1 },
    { positions: ['RB'], amount: 2 },
    { positions: ['WR'], amount: 2 },
    { positions: ['TE'], amount: 1 },
    { positions: ['RB', 'WR', 'TE'], amount: 1 },
    { positions: ['QB', 'RB', 'WR', 'TE'], amount: 1 },
  ]);
  const [positionsDisplay, setPositionsDisplay] = useState([
    { positions: ['QB'], amount: 1 },
    { positions: ['RB'], amount: 2 },
    { positions: ['WR'], amount: 2 },
    { positions: ['TE'], amount: 1 },
    { positions: ['FLEX'], amount: 1 },
    { positions: ['SUPERFLEX'], amount: 1 },
  ]);

  const [positionsInfoBasketball, setPositionsInfoBasketball] = useState([
    { positions: ['PG'], amount: 1 },
    { positions: ['SG'], amount: 1 },
    { positions: ['SF'], amount: 1 },
    { positions: ['PF'], amount: 1 },
    { positions: ['C'], amount: 1 },
    { positions: ['PG', 'SG'], amount: 1 },
    { positions: ['SF', 'PF'], amount: 1 },
    { positions: ['PG', 'SG', 'SF', 'PF', 'C'], amount: 1 },
  ]);
  const [positionsDisplayBasketball, setPositionsDisplayBasketball] = useState([
    { positions: ['PG'], amount: 1 },
    { positions: ['SG'], amount: 1 },
    { positions: ['SF'], amount: 1 },
    { positions: ['PF'], amount: 1 },
    { positions: ['C'], amount: 1 },
    { positions: ['G'], amount: 1 },
    { positions: ['F'], amount: 1 },
    { positions: ['ANY'], amount: 1 },
  ]);
  const [positionsInfoBaseball, setPositionsInfoBaseball] = useState([
    { positions: ['SP', 'RP'], amount: 2 },
    { positions: ['C'], amount: 1 },
    { positions: ['1B'], amount: 1 },
    { positions: ['2B'], amount: 1 },
    { positions: ['3B'], amount: 1 },
    { positions: ['SS'], amount: 1 },
    { positions: ['RF', 'LF', 'CF'], amount: 2 },
    { positions: ['DH', 'RF', 'LF', 'CF', 'SS', '3B', '2B', '1B', 'C'], amount: 1 },
  ]);
  const [positionsDisplayBaseball, setPositionsDisplayBaseball] = useState([
    { positions: ['P'], amount: 2 },
    { positions: ['C'], amount: 1 },
    { positions: ['1B'], amount: 1 },
    { positions: ['2B'], amount: 1 },
    { positions: ['3B'], amount: 1 },
    { positions: ['SS'], amount: 1 },
    { positions: ['OF'], amount: 2 },
    { positions: ['DH'], amount: 1 },
  ]);
  const [positionsInfoCricket, setPositionsInfoCricket] = useState([
    { positions: ['bowler'], amount: 2 },
    { positions: ['keeper'], amount: 1 },
    { positions: ['batsman'], amount: 2 },
    { positions: ['all_rounder'], amount: 2 },
    { positions: ['bowler', 'batsman', 'all_rounder', 'keeper'], amount: 5 },
  ]);

  const [positionsDisplayCricket, setPositionsDisplayCricket] = useState([
    { positions: ['BOWL'], amount: 2 },
    { positions: ['WK'], amount: 1 },
    { positions: ['BAT'], amount: 2 },
    { positions: ['AR'], amount: 2 },
    { positions: ['ANY'], amount: 5 },
  ]);
  const defaultGameDescription =
    'Enter a team into the The Blitz tournament to compete for cash prizes. Create a lineup by selecting 8 Playible Football Athlete Tokens now.';
  const defaultPrizeDescription = '$100 + 2 Championship Tickets';
  const defaultGameImage = 'https://playible-game-image.s3.ap-southeast-1.amazonaws.com/game.png';

  const [endMsg, setEndMsg] = useState({
    title: '',
    content: '',
  });
  const [percentTotal, setPercentTotal] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);
  const [remountPositionArea, setRemountPositionArea] = useState(0);
  const [remountDropdown, setRemountDropdown] = useState(0);
  const [positionList, setPositionList] = useState(SPORT_TYPES[0].positionList);
  const sportObj = SPORT_TYPES.filter((x) => x.key === 'NBA').map((x) => ({
    name: x.sport,
    isActive: false,
  }));
  const [mergeGameInfo, setMergeGameInfo] = useState({
    nearGameId: 1,
    polygonGameId: 1,
    sport: 'nba', //default
    auth: '',
  });
  console.log(sportObj);
  sportObj[0].isActive = true;
  const [sportList, setSportList] = useState([...sportObj]);
  const [currentSport, setCurrentSport] = useState(sportObj[0].name);
  const changeSportList = (name) => {
    const sports = [...sportList];

    sports.forEach((item) => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    setSportList([...sports]);
    setCurrentSport(name);
    setDetails({ ...details, position: getSportType(name).positionList[0].key });
  };
  const changeTab = (name) => {
    setGamesOffset(0);
    setGamesLimit(10);
    setRemountComponent(Math.random());
    const tabList = [...tabs];

    tabList.forEach((item) => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    setTabs([...tabList]);
  };

  const checkGameDescription = () => {
    if (gameDescription === null || gameDescription.length === 0) {
      setGameDescription(defaultGameDescription);
    }
  };

  const checkPrizeDescription = () => {
    if (prizeDescription === null || prizeDescription.length === 0) {
      setPrizeDescription(defaultPrizeDescription);
    }
  };

  const checkGameImage = () => {
    if (gameImage === null || gameImage === undefined) {
      setGameImage(defaultGameImage);
      setDetails({
        ...details,
        game_image: defaultGameImage,
      });
    }
  };

  const changeGameTab = (name) => {
    const tabList = [...gameTabs];
    setGamesOffset(0);
    setGamesLimit(10);
    setRemountComponent(Math.random());
    switch (name) {
      case 'NEW':
        setCurrentTotal(newGames.length);
        break;
      case 'ON-GOING':
        setCurrentTotal(ongoingGames.length);
        break;
      case 'COMPLETED':
        setCurrentTotal(completedGames.length);
        break;
    }
    tabList.forEach((item) => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    setGameTabs([...tabList]);
  };

  const modifyRankList = (type, rankNum, percentVal) => {
    let tempList = [...distribution];

    if (type === 'add') {
      const newDist = {
        rank: distribution.length + 1,
        percentage: 0,
      };
      setDistribution([...distribution, newDist]);
    }

    if (type === 'update') {
      tempList.forEach((item) => {
        if (item.rank === rankNum) {
          item.percentage = percentVal;
        }
      });

      setDistribution(tempList);
    }

    if (type === 'delete') {
      let newList = tempList.filter((item) => item.rank !== rankNum);

      setDistribution(newList);
    }
  };

  const getTotalPercent = () => {
    let total = 0;
    distribution.forEach((item) => (total += item.percentage));

    setPercentTotal(total);
  };

  const onChange = (e) => {
    if (e.target.name === 'positionAmount') {
      if (parseInt(e.target.value) > -1) {
        setDetails({
          ...details,
          [e.target.name]: parseInt(e.target.value),
        });
      }
    } else {
      setDetails({
        ...details,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangeWhitelist = (e) => {
    if (e.target.name === 'description') {
      if (e.target.value !== '') {
        const whitelistArray = e.target.value.split('\n').filter((n) => n);
        setWhitelistInfo(whitelistArray);
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setWhitelistInfo(null);
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const handleRadioClick = (value) => {
    setRadioSelected(value);
    // console.log('Game Image:', imageList[value]);
    setDetails({
      ...details,
      game_image: imageList[value].publicUrl,
    });

    setRadioValue(imageList[value].publicUrl);
  };

  const displayImageModal = async () => {
    setImageList(await listS3Image());
    if (imageList !== undefined || imageList !== null) {
      setImageModal(true);
    } else {
      alert('❌Task Failed Successfully');
    }
  };
  const listS3Image = async () => {
    const s3 = new ReactS3Client(s3config);

    try {
      const imageS3list = await s3.listFiles();

      console.log(imageS3list.data.Contents);

      return imageS3list.data.Contents;
      /*
       * {
       *   Response: {
       *     message: "Objects listed succesfully",
       *     data: {                   // List of Objects
       *       ...                     // Meta data
       *       Contents: []            // Array of objects in the bucket
       *     }
       *   }
       * }
       */
    } catch (exception) {
      alert('❌Failed to list images');
    }
  };

  const handleUpload = async () => {
    const s3 = new ReactS3Client(s3config);

    try {
      const res = await s3.uploadFile(gameImage);

      setDetails({
        ...details,
        game_image: res.location,
      });

      setGameImage(res.location);

      alert('✔️Successfully uploaded image!');

      /*
       * {
       *   Response: {
       *     bucket: "bucket-name",
       *     key: "directory-name/filename-to-be-uploaded",
       *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
       *   }
       * }
       */
    } catch (exception) {
      console.log(exception);
      alert('❌Failed to upload image');
    }
  };

  const onGameDescriptionChange = (e) => {
    if (e.target.name === 'game_description') {
      if (e.target.value !== '') {
        const gameDesc = e.target.value;
        setGameDescription(gameDesc);
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setGameDescription(defaultGameDescription);
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const onPrizeDescriptionChange = (e) => {
    if (e.target.name === 'prize_description') {
      if (e.target.value !== '') {
        const prizeDesc = e.target.value;
        setPrizeDescription(prizeDesc);
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setPrizeDescription(defaultPrizeDescription);
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * gamesLimit) % currentTotal;
    setGamesOffset(newOffset);
  };
  const checkValidity = () => {
    let errors = [];
    let sortPercentage = [...distribution].sort((a, b) => b.percentage - a.percentage);

    if (details.gameId == '') {
      errors.push('Game ID cannot be empty');
    }

    if (distribution.length === 1 && percentTotal === 0) {
      errors.push('Invalid Distribution values');
    }

    if (percentTotal < 100) {
      errors.push('Total percent distribution must be equal to 100');
    }

    if (distribution.length < 10) {
      errors.push(
        'Exactly 10 rank distribution must be provided. (Only ' +
          distribution.length +
          ' was provided)'
      );
    }

    if (dateEnd < dateStart) {
      errors.push('End Time can not be earlier than Start Time');
    }

    if (Number.isNaN(dateEnd)) {
      errors.push('End date has no value');
    }

    if (Number.isNaN(dateStart)) {
      errors.push('Start date has no value');
    }

    if (dateStart * 1000 < Date.now()) {
      errors.push('Start date is earlier than local time');
    }

    if (positionsInfo.length === 0) {
      errors.push('Positions can not be empty');
    }

    if (distribution.filter((item) => item.percentage === 0 || item.percentage < 0).length > 0) {
      errors.push('A distribution percentage of 0% is not allowed');
    }

    if (!selectedRegular && !selectedPromo && !selectedSoulbound) {
      errors.push('NFT Type cannot be empty');
    }

    for (let i = 0; i < distribution.length; i++) {
      if (distribution[i].rank !== sortPercentage[i].rank) {
        errors.push('Higher rank must have a higher percentage than the rest below');
        break;
      }
    }

    return errors;
  };

  const validateGame = () => {
    if (checkValidity().length > 0) {
      alert(
        `ERRORS: \n${checkValidity()
          .map((item) => '❌ ' + item)
          .join(` \n`)}`.replace(',', '')
      );
    } else {
      setConfirmModal(true);
    }
  };

  const handleButtonClick = (e, currentSport) => {
    e.preventDefault();
    if (currentSport === 'FOOTBALL') {
      //get current position and amount from details
      let position = [details['position']];
      let display = position;
      let amount = details['positionAmount'];
      switch (position[0]) {
        case 'FLEX':
          position = ['RB', 'WR', 'TE'];
          break;
        case 'SUPERFLEX':
          position = ['QB', 'RB', 'WR', 'TE'];
          break;
      }
      let found = positionsInfo.findIndex((e) => e.positions.join() === position.join());

      if (positionsInfo.length === 0) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfo([object]);
        setPositionsDisplay([object2]);
      }
      //could not find
      else if (found === -1) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfo((current) => [...current, object]);
        setPositionsDisplay((current) => [...current, object2]);
      } else {
        //found has index of same position
        let current = positionsInfo;
        let current2 = positionsDisplay;
        //@ts-ignore:next-line
        current[found].amount += amount;
        current2[found].amount += amount;
        setPositionsInfo(current);
        setPositionsDisplay(current2);
        setRemountPositionArea(Math.random());
      }
    } else if (currentSport === 'BASKETBALL') {
      let position = [details['position']];
      let display = position;
      let amount = details['positionAmount'];
      switch (position[0]) {
        case 'G':
          position = ['PG', 'SG'];
          break;
        case 'F':
          position = ['SF', 'PF'];
          break;
        case 'ANY':
          position = ['PG', 'SG', 'SF', 'PF', 'C'];
          break;
      }
      let found = positionsInfoBasketball.findIndex((e) => e.positions.join() === position.join());

      if (positionsInfoBasketball.length === 0) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfoBasketball([object]);
        setPositionsDisplayBasketball([object2]);
      }
      //could not find
      else if (found === -1) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfoBasketball((current) => [...current, object]);
        setPositionsDisplayBasketball((current) => [...current, object2]);
      } else {
        //found has index of same position
        let current = positionsInfoBasketball;
        let current2 = positionsDisplayBasketball;
        //@ts-ignore:next-line
        current[found].amount += amount;
        current2[found].amount += amount;
        setPositionsInfoBasketball(current);
        setPositionsDisplayBasketball(current2);
        setRemountPositionArea(Math.random());
      }
    } else if (currentSport === 'BASEBALL') {
      let position = [details['position']];
      let display = position;
      let amount = details['positionAmount'];
      switch (position[0]) {
        case 'P':
          position = ['SP', 'RP'];
          break;
        case 'OF':
          position = ['RF', 'LF', 'CF'];
          break;
        case 'DH':
          position = ['RF', 'LF', 'CF', 'SS', '3B', '2B', '1B', 'C'];
          break;
      }
      let found = positionsInfoBaseball.findIndex((e) => e.positions.join() === position.join());

      if (positionsInfoBaseball.length === 0) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfoBaseball([object]);
        setPositionsDisplayBaseball([object2]);
      } else if (found === -1) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfoBaseball((current) => [...current, object]);
        setPositionsDisplayBaseball((current) => [...current, object2]);
      } else {
        let current = positionsInfoBaseball;
        let current2 = positionsDisplayBaseball;
        current[found].amount += amount;
        current2[found].amount += amount;
        setPositionsInfoBaseball(current);
        setPositionsDisplayBaseball(current2);
        setRemountPositionArea(Math.random());
      }
    } else {
      let position = [details['position']];
      let display = position;
      let amount = details['positionAmount'];

      switch (position[0]) {
        case 'ANY':
          position = ['BOWL', 'WK', 'BAT', 'AR'];
          break;
      }
      let found = positionsInfoCricket.findIndex((e) => e.positions.join() === position.join());

      if (positionsInfoCricket.length === 0) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfoCricket([object]);
        setPositionsDisplayCricket([object2]);
      } else if (found === -1) {
        let object = { positions: position, amount: amount };
        let object2 = { positions: display, amount: amount };
        setPositionsInfoCricket((current) => [...current, object]);
        setPositionsDisplayCricket((current) => [...current, object2]);
      } else {
        let current = positionsInfoCricket;
        let current2 = positionsDisplayCricket;
        //@ts-ignore:next-line
        current[found].amount += amount;
        current2[found].amount += amount;
        setPositionsInfoCricket(current);
        setPositionsDisplayCricket(current2);
        setRemountPositionArea(Math.random());
      }
    }
  };
  const getExtraPos = (currentSport) => {
    switch (currentSport) {
      case 'FOOTBALL':
        return [
          { name: 'FLEX', key: 'FLEX' },
          { name: 'SUPERFLEX', key: 'SUPERFLEX' },
        ];
      case 'BASKETBALL':
        return [
          { name: 'GUARD', key: 'G' },
          { name: 'FORWARD', key: 'F' },
          { name: 'ANY', key: 'ANY' },
        ];
      //baseball placeholder
      case 'BASEBALL':
        return [{ name: 'DESIGNATED HITTER', key: 'DH' }];
      //cricket placeholder
      case 'CRICKET':
        return [{ name: 'ANY', key: 'ANY' }];
    }
  };
  const handleRemove = (e, currentSport) => {
    e.preventDefault();
    if (currentSport === 'FOOTBALL') {
      positionsInfo.pop();
      positionsDisplay.pop();
    } else if (currentSport === 'BASKETBALL') {
      positionsInfoBasketball.pop();
      positionsDisplayBasketball.pop();
    } else if (currentSport === 'BASEBALL') {
      positionsInfoBaseball.pop();
      positionsDisplayBaseball.pop();
    } else {
      positionsInfoCricket.pop();
      positionsDisplayCricket.pop();
    }
    setRemountPositionArea(Math.random());
  };

  const NFL_POSITIONS = ['QB', 'RB', 'WR', 'TE', 'FLEX', 'SUPERFLEX'];
  const BASKETBALL_POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'ANY'];

  const [details, setDetails] = useState({
    // name: '',
    gameId: '',
    startTime: '',
    endTime: '',
    prize: 1,
    usage: 0,
    description: '',
    whitelist: whitelistInfo,
    position: getSportType(currentSport).positionList[0].key,
    positionAmount: 1,
    game_description: gameDescription,
    prize_description: prizeDescription,
    game_image: '',
  });

  const dateStartFormatted = moment(details.startTime).format('YYYY-MM-DD HH:mm:ss');
  const dateStart = moment(dateStartFormatted).utc().unix();
  const dateEndFormatted = moment(details.endTime).format('YYYY-MM-DD HH:mm:ss');
  const dateEnd = moment(dateEndFormatted).utc().unix();

  const startFormattedTimestamp = moment(dateStartFormatted).toLocaleString();
  const endFormattedTimestamp = moment(dateEndFormatted).toLocaleString();

  async function getGameCurrentCounter() {
    const result = await fetchGameCounter();
    setTotalGames(Number(result));
  }

  async function get_games_list(totalGames) {
    // query_games_list(totalGames, getSportType(currentSport).gameContract).then(async (data) => {
    //   //@ts-ignore:next-line
    //   const result = JSON.parse(Buffer.from(data.result).toString());
    //   const upcomingGames = await Promise.all(
    //     result
    //       .filter((x) => x[1].start_time > getUTCTimestampFromLocal())
    //       .map((item) => getGameInfoById(accountId, item, 'new', currentSport))
    //   );
    //   const completedGames = await Promise.all(
    //     result
    //       .filter((x) => x[1].end_time < getUTCTimestampFromLocal())
    //       .map((item) => getGameInfoById(accountId, item, 'completed', currentSport))
    //   );
    //   const ongoingGames = await Promise.all(
    //     result
    //       .filter(
    //         (x) =>
    //           x[1].start_time < getUTCTimestampFromLocal() &&
    //           x[1].end_time > getUTCTimestampFromLocal()
    //       )
    //       .map((item) => getGameInfoById(accountId, item, 'on-going', currentSport))
    //   );
    //   setCurrentTotal(upcomingGames.length);
    //   setNewGames(upcomingGames);
    //   setCompletedGames(completedGames);
    //   setOngoingGames(ongoingGames);
    // });
    const result = await fetchAllGames(); //only gets NFL games for now
    console.log(result);
    setTotalGames(result.length);
    console.log(getUTCTimestampFromLocal());
    const upcoming = await Promise.all(
      result
        .filter((x) => Number(x.startTime) * 1000 > getUTCTimestampFromLocal())
        .map((item) => mapGameInfo(item, 'new', currentSport))
    );
    const completed = await Promise.all(
      result
        .filter((x) => Number(x.endTime) * 1000 < getUTCTimestampFromLocal())
        .map((item) => mapGameInfo(item, 'completed', currentSport))
    );
    const ongoing = await Promise.all(
      result
        .filter(
          (x) =>
            Number(x.startTime) * 1000 < getUTCTimestampFromLocal() &&
            Number(x.endTime) * 1000 > getUTCTimestampFromLocal()
        )
        .map((item) => mapGameInfo(item, 'on-going', currentSport))
    );
    console.log(upcoming);
    console.log(completed);
    console.log(ongoing);
    setNewGames(upcoming);
    setCompletedGames(completed);
    setOngoingGames(ongoing);
  }

  function getLineupLength(currentSport) {
    let counter = 0;
    let sportInfo =
      currentSport === 'FOOTBALL'
        ? positionsInfo
        : currentSport === 'BASKETBALL'
        ? positionsInfoBasketball
        : currentSport === 'BASEBALL'
        ? positionsInfoBaseball
        : positionsInfoCricket;
    for (let i = 0; i < sportInfo.length; i++) {
      counter = counter + sportInfo[i]?.amount;
    }
    return counter;
  }

  async function execute_add_game(token_TypeWhitelist) {
    //deconstructPosition(positionsInfo);
    const args: AddGameType = {
      gameId: parseInt(details.gameId),
      gameStartTime: dateStart,
      gameEndTime: dateEnd,
      whitelist: whitelistInfo !== null ? whitelistInfo : [],
      tokenTypeWhitelist: token_TypeWhitelist, //hardcoded token type whitelist
      usageCost: 0,
      positions: positionsInfo,
      lineupLen: getLineupLength(currentSport),
      gameDescription: gameDescription,
      prizeDescription: prizeDescription,
      gameImage: gameImage,
    };
    const success = await executeAddGame(args, wallet);
    if (success) {
      alert(`Game ${parseInt(details.gameId)} for ${currentSport} successfully added`);
    } else {
      alert(`Error in adding game ${parseInt(details.gameId)} for ${currentSport}`);
    }
    console.log(args);
    // const addGameArgs = Buffer.from(
    //   JSON.stringify({
    //     game_id: details.gameId.toString(),
    //     game_time_start: dateStart,
    //     game_time_end: dateEnd,
    //     whitelist: whitelistInfo,
    //     positions:
    //       currentSport === 'FOOTBALL'
    //         ? positionsInfo
    //         : currentSport === 'BASKETBALL'
    //         ? positionsInfoBasketball
    //         : currentSport === 'BASEBALL'
    //         ? positionsInfoBaseball
    //         : positionsInfoCricket,
    //     lineup_len: getLineupLength(currentSport),
    //     game_description: gameDescription,
    //     prize_description: prizeDescription,
    //     game_image: gameImage,
    //   })
    // );

    // console.log(
    //   JSON.stringify({
    //     game_id: details.gameId.toString(),
    //     game_time_start: dateStart,
    //     game_time_end: dateEnd,
    //     whitelist: whitelistInfo,
    //     positions:
    //       currentSport === 'FOOTBALL'
    //         ? positionsInfo
    //         : currentSport === 'BASKETBALL'
    //         ? positionsInfoBasketball
    //         : currentSport === 'BASEBALL'
    //         ? positionsInfoBaseball
    //         : positionsInfoCricket,
    //     lineup_len: getLineupLength(currentSport),
    //     game_description: gameDescription,
    //     prize_description: prizeDescription,
    //     game_image: gameImage,
    //   })
    // );
  }

  const onNearGameIdChange = (e) => {
    if (e.target.value !== 0) {
      const nearGameId = e.target.value;
      setMergeGameInfo({ ...mergeGameInfo, [e.target.name]: e.target.value });
    }
  };
  const onPolygonGameIdChange = (e) => {
    if (e.target.value !== 0) {
      const polygonGameId = e.target.value;
      setMergeGameInfo({ ...mergeGameInfo, [e.target.name]: e.target.value });
    }
  };

  const submitMerge = async () => {
    //add checking for gameIds if they exist
    // console.log({
    //   nearGameId: mergeGameInfo.nearGameId,
    //   polygonGameId: mergeGameInfo.polygonGameId,
    //   auth: mergeGameInfo.auth,
    // });
    console.log(mergeGameInfo.polygonGameId);
    try {
      const { data, errors } = await client.mutate({
        mutation: MERGE_INTO_LEADERBOARD,
        variables: {
          sport: 'nfl',
          polygonGameId: parseFloat(mergeGameInfo.polygonGameId.toString()),
          nearGameId: parseFloat(mergeGameInfo.nearGameId.toString()),
        },
        context: {
          headers: {
            Authorization: mergeGameInfo.auth,
          },
        },
        errorPolicy: 'all',
      });
      if (data !== null) {
        alert(
          `Multi-chain leaderboard for polygon game ID ${mergeGameInfo.polygonGameId} and NEAR game ID ${mergeGameInfo.nearGameId} created`
        );
      } else {
        alert(
          `Encountered an error creating multi-chain leaderboard for polygon game ID ${mergeGameInfo.polygonGameId} and NEAR game ID ${mergeGameInfo.nearGameId}`
        );
      }
    } catch (e) {
      console.error(e);
    }
    // const { data } = await client.query({
    //   query: GET_GAME,
    //   variables: {
    //     getGameByIdId: 8,
    //   },
    // });
    // console.log(data);
  };

  const onAuthChange = (e) => {
    const auth = e.target.value;
    setMergeGameInfo({ ...mergeGameInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getTotalPercent();
  }, [distribution]);
  useEffect(() => {
    setRemountPositionArea(Math.random());
  }, [
    positionsInfo,
    positionsDisplay,
    positionsInfoBasketball,
    positionsDisplayBasketball,
    positionsInfoBaseball,
    positionsDisplayBaseball,
    positionsInfoCricket,
    positionsDisplayCricket,
    // positionsInfoCricket,
    // positionsDisplayCricket
  ]);
  useEffect(() => {
    get_games_list(totalGames);
    getGameCurrentCounter();

    const list = SPORT_TYPES.find((x) => x.sport === currentSport);

    setPositionList(list.positionList);
    setRemountDropdown(Math.random());
  }, [totalGames, currentSport]);

  useEffect(() => {
    const getSecretKeys = async () => {
      return await secretKeys();
    };

    getSecretKeys()
      .then((data) => {
        setS3Config(data);
      })
      .catch((error) => console.log(error));
  }, [totalGames, currentSport]);

  const [selectedRegular, setSelectedRegular] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState(true);
  const [selectedSoulbound, setSelectedSoulbound] = useState(true);

  let token_TypeWhitelist = [];
  if (selectedRegular) {
    token_TypeWhitelist.push('1');
  }
  if (selectedPromo) {
    token_TypeWhitelist.push('2');
  }
  if (selectedSoulbound) {
    token_TypeWhitelist.push('3');
  }

  console.log('TOKEN VALUES', token_TypeWhitelist);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/Admin/Login');
    }
  });

  useEffect(() => {
    currentTotal !== 0 ? setPageCount(Math.ceil(currentTotal / gamesLimit)) : setPageCount(1);
  }, [currentTotal]);
  return (
    <Container isAdmin>
      <div className="flex flex-col w-full overflow-y-auto h-screen justify-center self-center">
        <Main color="indigo-white">
          <div className="flex flex-col w-full overflow-y-auto overflow-x-hidden h-screen self-center text-indigo-black">
            <div className="flex md:ml-4 font-bold font-monument mt-5">
              {tabs.map(({ name, isActive }) => (
                <div
                  className={`cursor-pointer mr-6 ${
                    isActive ? 'border-b-8 border-indigo-buttonblue' : ''
                  }`}
                  onClick={() => changeTab(name)}
                >
                  {name}
                </div>
              ))}
            </div>
            <hr className="opacity-50" />
            <div>
              {sportList.map((x, index) => {
                return (
                  <button
                    className={`rounded-lg border mt-4 px-8 p-1 text-xs md:font-medium font-monument ${
                      index === 0 ? `md:ml-14` : 'md:ml-4'
                    } ${
                      x.isActive
                        ? 'bg-indigo-buttonblue text-indigo-white border-indigo-buttonblue'
                        : ''
                    }`}
                    onClick={() => {
                      changeSportList(x.name);
                    }}
                  >
                    {x.name}
                  </button>
                );
              })}
            </div>
            <div className="p-8 px-32">
              {loading ? (
                <LoadingPageDark />
              ) : tabs[0].isActive ? (
                <div className="flex flex-col">
                  <div className="flex font-bold -ml-16 font-monument">
                    {gameTabs.map(({ name, isActive }) => (
                      <div
                        className={`cursor-pointer mr-6 ${
                          isActive ? 'border-b-8 border-indigo-buttonblue' : ''
                        }`}
                        onClick={() => changeGameTab(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 ml-6 grid grid-cols-0 md:grid-cols-3">
                    {(gameTabs[0].isActive
                      ? newGames
                      : gameTabs[1].isActive
                      ? ongoingGames
                      : completedGames
                    ).length > 0 &&
                      (gameTabs[0].isActive
                        ? newGames
                        : gameTabs[1].isActive
                        ? ongoingGames
                        : completedGames
                      )
                        .filter((data, i) => i >= gamesOffset && i < gamesOffset + gamesLimit)
                        .map((data, i) => {
                          return (
                            <div key={i}>
                              <AdminGameComponent
                                game_id={data.game_id}
                                start_time={data.start_time}
                                end_time={data.end_time}
                                whitelist={data.whitelist}
                                positions={data.positions}
                                lineup_len={data.lineup_len}
                                joined_player_counter={data.joined_player_counter}
                                joined_team-counter={data.joined_team_counter}
                                type="upcoming"
                                isCompleted={data.isCompleted}
                                status={data.status}
                                img={data.game_image}
                              />
                            </div>
                          );
                        })}
                    {/* {(gameTabs[0].isActive ? upcomingGames: completedGames).length > 0 &&
                          (gameTabs[0].isActive ? upcomingGames : completedGames).map(function (data, i) {
                            return(
                              
                            )
                            // return (
                            //   <div className="flex flex-col w-full overflow-y-auto h-screen justify-center self-center md:pb-12">
                            //     {data.whitelist}
                            //   </div>
                            //   // <div className="border-b p-5 py-8">
                            //   //   <div className="flex justify-between">
                            //   //     <div>
                            //   //       <p className="font-bold text-lg">{data.name}</p>
                            //   //       {gameTabs[0].isActive ? (
                            //   //         <ReactTimeAgo
                            //   //           future
                            //   //           timeStyle="round-minute"
                            //   //           date={data.startTime}
                            //   //           locale="en-US"
                            //   //         />
                            //   //       ) : (
                            //   //         ''
                            //   //       )}
                            //   //       <p>Prize: $ {data.prize}</p>
                            //   //     </div>
                            //   //     {gameTabs[0].isActive ? (
                            //   //       ''
                            //   //     ) : (
                            //   //       <div>
                            //   //         <button
                            //   //           className="bg-indigo-green font-monument tracking-widest  text-indigo-white w-5/6 md:w-64 h-16 text-center text-sm"
                            //   //           onClick={() => {
                            //   //             setGameId(data.id);
                            //   //             setEndModal(true);
                            //   //           }}
                            //   //         >
                            //   //           END GAME
                            //   //         </button>
                            //   //       </div>
                            //   //     )}
                            //   //   </div>
                            //   // </div>
                            // );
                          })} */}
                  </div>
                  <div className="absolute bottom-10 right-10 iphone5:bottom-4 iphone5:right-2 iphoneX:bottom-4 iphoneX:right-4 iphoneX-fixed">
                    <div key={remountComponent}>
                      <ReactPaginate
                        className="p-2 text-center bg-indigo-buttonblue text-indigo-white flex flex-row space-x-4 select-none ml-7"
                        pageClassName="hover:font-bold"
                        activeClassName="rounded-lg text-center bg-indigo-white text-indigo-black pr-1 pl-1 font-bold"
                        pageLinkClassName="rounded-lg text-center hover:font-bold hover:bg-indigo-white hover:text-indigo-black"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </div>
                </div>
              ) : tabs[1].isActive ? (
                <>
                  <div>
                    <AdminGameFilter
                      onChangeFn={(selectedRegular, selectedPromo, selectedSoulbound) => {
                        setSelectedRegular(selectedRegular);
                        setSelectedPromo(selectedPromo);
                        setSelectedSoulbound(selectedSoulbound);
                        setRemountComponent(Math.random());
                      }}
                    />
                    {/* GAME ID */}
                    <div className="flex flex-col lg:w-1/2">
                      <label className="font-monument" htmlFor="gameid">
                        GAME ID (Suggested ID: {totalGames + 1})
                      </label>
                      <input
                        className="border outline-none rounded-lg px-3 p-2 w-1/2"
                        id="gameid"
                        type="number"
                        min="0"
                        name="gameId"
                        onChange={(e) => onChange(e)}
                        value={details.gameId}
                      />
                    </div>
                  </div>

                  <div className="flex mt-8">
                    {/* GAME TITLE */}
                    {/* <div className="flex flex-col lg:w-1/2 lg:mr-10">
                          <label className="font-monument" htmlFor="title">
                            TITLE
                          </label>
                          <input
                            className="border outline-none rounded-lg px-3 p-2"
                            id="title"
                            name="name"
                            placeholder="Enter title"
                            onChange={(e) => onChange(e)}
                            value={details.name}
                          />
                        </div> */}

                    {/* DATE & TIME */}
                    <div className="flex flex-col lg:w-1/2">
                      <label className="font-monument" htmlFor="datetime">
                        START TIME
                      </label>
                      <input
                        className="border outline-none rounded-lg px-3 p-2"
                        id="datetime"
                        type="datetime-local"
                        name="startTime"
                        onChange={(e) => onChange(e)}
                        value={details.startTime}
                      />
                    </div>
                    <div className="flex flex-col lg:w-1/2 ml-10">
                      <label className="font-monument" htmlFor="datetime">
                        END TIME
                      </label>
                      <input
                        className="border outline-none rounded-lg px-3 p-2"
                        id="datetime"
                        type="datetime-local"
                        name="endTime"
                        onChange={(e) => onChange(e)}
                        value={details.endTime}
                      />
                    </div>
                  </div>

                  <div className="flex">
                    {/* DURATION */}

                    {/* PRIZE */}
                    {/* <div className="flex flex-col lg:w-1/2">
                      <label className="font-monument" htmlFor="prize">
                        PRIZE
                      </label>
                      <input
                        className="border outline-none rounded-lg px-3 p-2"
                        id="prize"
                        type="number"
                        name="prize"
                        min={1}
                        placeholder="Enter amount"
                        onChange={(e) => onChange(e)}
                        value={details.prize}
                      />
                    </div> */}
                  </div>

                  <div className="flex mt-8">
                    {/* DESCRIPTION */}
                    <div className="flex flex-col w-1/2">
                      <label className="font-monument" htmlFor="duration">
                        WHITELIST
                      </label>
                      <textarea
                        className="border outline-none rounded-lg px-3 p-2"
                        id="description"
                        name="description"
                        // type="text"
                        placeholder="Enter accounts to whitelist. One account per line. Leave empty for no whitelist."
                        onChange={(e) => onChangeWhitelist(e)}
                        // value={details.description}
                        style={{
                          minHeight: '120px',
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-1/2 ml-10">
                      <label className="font-monument" htmlFor="duration">
                        GAME DESCRIPTION
                      </label>
                      <textarea
                        maxLength={160}
                        className="border outline-none rounded-lg px-3 p-2"
                        id="game_description"
                        name="game_description"
                        // type="text"
                        placeholder="Game Description Enter text up to 160 text."
                        onChange={(e) => onGameDescriptionChange(e)}
                        // value={details.description}
                        style={{
                          minHeight: '120px',
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex mt-8">
                    <div className="flex flex-col w-1/2">
                      <label className="font-monument" htmlFor="duration">
                        PRIZE DESCRIPTION
                      </label>
                      <textarea
                        maxLength={50}
                        className="border outline-none rounded-lg px-3 p-2"
                        id="prize_description"
                        name="prize_description"
                        // type="text"
                        placeholder="Prize Description Enter text up to 50 text."
                        onChange={(e) => onPrizeDescriptionChange(e)}
                        // value={details.description}
                        style={{
                          minHeight: '120px',
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-1/2 ml-10">
                      <label className="font-monument">GAME IMAGE</label>
                      <div className="flex flex-col mb-4">
                        {/* <div>
                          <label className="font-monument">GAME IMAGE PREVIEW</label>
                        </div> */}
                        <div className="border outline-none rounded-lg px-3 p-2 self-center">
                          <img
                            src={
                              gameImage === null || gameImage === undefined
                                ? defaultGameImage
                                : gameImage
                            }
                            height={300}
                            width={300}
                          />
                        </div>
                      </div>
                      <input
                        type="file"
                        onChange={(e) => {
                          setGameImage(e.target.files[0]);
                        }}
                      ></input>
                      <button
                        className="mt-5 bg-indigo-buttonblue h-10 text-indigo-white"
                        id="image"
                        name="image"
                        onClick={handleUpload}
                      >
                        UPLOAD GAME IMAGE
                      </button>

                      <button
                        className="mt-5 bg-indigo-buttonblue h-10 text-indigo-white"
                        id="image"
                        name="image"
                        onClick={displayImageModal}
                      >
                        SELECT IMAGE FROM BUCKET
                      </button>
                    </div>
                  </div>

                  <div className="flex mt-8">
                    {/* POSITIONS */}
                    <div className="flex flex-col w-1/2">
                      <label className="font-monument" htmlFor="positions">
                        POSITIONS
                      </label>
                      <form key={remountDropdown}>
                        <select
                          className="bg-filter-icon bg-no-repeat bg-origin-content bg-right bg-indigo-white iphone5:w-28 w-36 md:w-42 lg:w-60
                          ring-indigo-black focus:outline-none cursor-pointer rounded-lg text-xs md:text-base mr-4 border outline-none px-3 p-2"
                          name="position"
                          onChange={(e) => onChange(e)}
                        >
                          {positionList.map((x) => {
                            return <option value={x.key}>{x.name}</option>;
                          })}
                          {getExtraPos(currentSport).map((x) => {
                            return <option value={x.key}>{x.name}</option>;
                          })}
                        </select>
                        <input
                          className="border outline-none rounded-lg px-3 p-2 w-24 mr-4"
                          type="number"
                          id="positionAmount"
                          name="positionAmount"
                          pattern="[0-9]*"
                          placeholder="Enter position amount"
                          onChange={(e) => onChange(e)}
                          value={details.positionAmount}
                        />
                        <button
                          className="border outline-none rounded-lg px-3 p-2 mr-4"
                          onClick={(e) => handleButtonClick(e, currentSport)}
                        >
                          +
                        </button>
                        <button
                          className="border outline-none rounded-lg px-3 p-2"
                          onClick={(e) => handleRemove(e, currentSport)}
                        >
                          -
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="flex mt-8">
                    <div className="flex flex-col w-2/5">
                      {currentSport === 'FOOTBALL' ? (
                        <div className="border outline-none rounded-lg px-3 p-2">
                          {positionsDisplay.map((x) => {
                            return (
                              <label className="flex w-full whitespace-pre-line">
                                Position: {x.positions} Amount: {x.amount}
                              </label>
                            );
                          })}
                        </div>
                      ) : currentSport === 'BASKETBALL' ? (
                        <div className="border outline-none rounded-lg px-3 p-2">
                          {positionsDisplayBasketball.map((x) => {
                            return (
                              <label className="flex w-full whitespace-pre-line">
                                Position: {x.positions} Amount: {x.amount}
                              </label>
                            );
                          })}
                        </div>
                      ) : currentSport === 'BASEBALL' ? (
                        <div className="border outline-none rounded-lg px-3 p-2">
                          {positionsDisplayBaseball.map((x) => {
                            return (
                              <label className="flex w-full whitespace-pre-line">
                                Position: {x.positions} Amount: {x.amount}
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="border outline-none rounded-lg px-3 p-2">
                          {positionsDisplayCricket.map((x) => {
                            return (
                              <label className="flex w-full whitespace-pre-line">
                                Position: {x.positions} Amount: {x.amount}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DISTRIBUTION FORM */}
                  {/* <div className="mt-8">
                        <p className="font-monument">DISTRIBUTION</p>
                        {distribution.map(({ rank, percentage }) => (
                          <Distribution
                            rank={rank}
                            value={percentage}
                            handleChange={modifyRankList}
                            showDelete={rank === distribution.length && distribution.length > 1}
                            percentTotal={percentTotal}
                          />
                        ))}

                        {distribution.length < 10 ? (
                          <div className="flex justify-start">
                            <button
                              className="bg-indigo-darkgray text-indigo-white w-5/6 md:w-48 h-10 text-center font-bold text-sm mt-4"
                              // onClick={}
                            >
                              Add New Rank
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                      </div> */}

                  <div className="flex mt-4 mb-10">
                    <button
                      className="bg-indigo-green font-monument tracking-widest text-indigo-white w-5/6 md:w-80 h-16 text-center text-sm mt-4"
                      onClick={() => {
                        validateGame();
                        checkGameDescription();
                        checkPrizeDescription();
                        checkGameImage();
                      }}
                    >
                      CREATE GAME
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex mt-8">
                    <div className="flex flex-col lg:w-1/4">
                      <label className="font-monument">NEAR GAME ID</label>
                      <input
                        className="border outline-none rounded-lg px-3 p-2 w-5/6"
                        id="nearGameId"
                        type="number"
                        min="1"
                        name="nearGameId"
                        onChange={(e) => onNearGameIdChange(e)}
                        value={mergeGameInfo.nearGameId}
                      ></input>
                    </div>
                    <div className="flex flex-col lg:w-1/4 ml-10">
                      <label className="font-monument">POLYGON GAME ID</label>
                      <input
                        className="border outline-none rounded-lg px-3 p-2 w-5/6"
                        id="polygonGameId"
                        type="number"
                        min="1"
                        name="polygonGameId"
                        onChange={(e) => onPolygonGameIdChange(e)}
                        value={mergeGameInfo.polygonGameId}
                      ></input>
                    </div>
                  </div>
                  <div className="flex mt-8">
                    <div className="flex flex-col lg:w-1/4">
                      <label className="font-monument">AUTHORIZATION</label>
                      <input
                        className="border outline-none rounded-lg px-3 p-2 w-5/6"
                        id="auth"
                        type="text"
                        name="auth"
                        onChange={(e) => onAuthChange(e)}
                        value={mergeGameInfo.auth}
                      ></input>
                    </div>
                    <div className="flex flex-col ml-10 lg:w-1/4">
                      <button
                        className="mt-6 bg-indigo-buttonblue h-10 w-48 text-indigo-white"
                        id="image"
                        name="image"
                        onClick={submitMerge}
                      >
                        CONFIRM
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Main>
      </div>
      <BaseModal title={endMsg.title} visible={endLoading} onClose={() => console.log()}>
        {endMsg.content ? (
          <div>
            <p className="mt-5">{endMsg.content}</p>
            <div className="flex gap-5 justify-center mb-5">
              <div className="bg-indigo-buttonblue animate-bounce w-5 h-5 rounded-full"></div>
              <div className="bg-indigo-buttonblue animate-bounce w-5 h-5 rounded-full"></div>
              <div className="bg-indigo-buttonblue animate-bounce w-5 h-5 rounded-full"></div>
            </div>
          </div>
        ) : (
          ''
        )}
      </BaseModal>
      <BaseModal title={'Confirm'} visible={confirmModal} onClose={() => setConfirmModal(false)}>
        <p className="mt-2">Are you sure?</p>
        <p className="font-bold">GAME DETAILS:</p>
        <p className="font-bold">Start Date:</p> {startFormattedTimestamp}
        <p className="font-bold">End Date:</p> {endFormattedTimestamp}
        <p className="font-bold">Whitelist: </p>{' '}
        {whitelistInfo === null ? '' : whitelistInfo.join(', ')}
        <p className="font-bold">NFT Token Type: </p>
        {token_TypeWhitelist.map((value, index) => (
          <span key={index}>
            {index > 0 ? ', ' : ''}
            {value === '1' ? 'Regular' : value === '2' ? 'Promo' : value === '3' ? 'Soulbound' : ''}
          </span>
        ))}
        <p className="font-bold">Game Description: </p>
        {gameDescription}
        <p className="font-bold">Prize Description: </p>
        {prizeDescription}
        <p className="font-bold">Positions:</p>
        {currentSport === 'FOOTBALL'
          ? positionsDisplay.map((position) => (
              <li>
                {position.positions} {position.amount}x
              </li>
            ))
          : currentSport === 'BASKETBALL'
          ? positionsDisplayBasketball.map((position) => (
              <li>
                {position.positions} {position.amount}x
              </li>
            ))
          : currentSport === 'BASEBALL'
          ? positionsDisplayBaseball.map((position) => (
              <li>
                {position.positions} {position.amount}x
              </li>
            ))
          : positionsDisplayCricket.map((position) => (
              <li>
                {position.positions} {position.amount}x
              </li>
            ))}
        <p className="font-bold">Image: </p>
        <button
          className="fixed top-4 right-4 "
          onClick={() => {
            setConfirmModal(false);
          }}
        >
          <img src="/images/x.png" />
        </button>
        <img src={details.game_image} />
        <button
          className="bg-indigo-green font-monument tracking-widest text-indigo-white w-full h-16 text-center text-sm mt-4"
          onClick={() => {
            execute_add_game(token_TypeWhitelist);
            setConfirmModal(false);
          }}
        >
          CREATE GAME
        </button>
        <button
          className="bg-red-pastel font-monument tracking-widest text-indigo-white w-full h-16 text-center text-sm mt-4"
          onClick={() => setConfirmModal(false)}
        >
          CANCEL
        </button>
      </BaseModal>
      <BaseModal title={'End game'} visible={endModal} onClose={() => setEndModal(false)}>
        <p className="mt-5">Are you sure?</p>
        <button
          className="bg-indigo-green font-monument tracking-widest text-indigo-white w-full h-16 text-center text-sm mt-4"
          onClick={() => {
            setEndModal(false);
          }}
        >
          END GAME
        </button>
        <button
          className="bg-red-pastel font-monument tracking-widest text-indigo-white w-full h-16 text-center text-sm mt-4"
          onClick={() => setEndModal(false)}
        >
          CANCEL
        </button>
      </BaseModal>
      <Modal
        title={'SELECT IMAGE'}
        visible={imageModal}
        onClose={() => setImageModal(false)}
        AdminGame={true}
      >
        <button
          className="fixed top-4 right-4 "
          onClick={() => {
            setImageModal(false);
          }}
        >
          <img src="/images/x.png" />
        </button>
        <div className="w-full">
          <div className="mt-4 gap-x-6 gap-y-12 grid grid-cols-0 md:grid-cols-4 md:h-108 h-80 overflow-y-auto">
            {imageList !== undefined || imageList !== null
              ? imageList?.map((data, i) => {
                  return (
                    <div className="mr-4 mb-2">
                      <input
                        className="justify-self-end"
                        type="radio"
                        checked={radioSelected == i}
                        value={i}
                        onChange={(e) => handleRadioClick(e.target.value)}
                      ></input>
                      <img src={data.publicUrl}></img>
                    </div>
                  );
                })
              : ''}
          </div>
          <div className="flex flex-row mt-4">
            <button
              className="bg-red-pastel font-monument text-indigo-white w-full h-8 tracking-widest text-center text-sm"
              onClick={() => setImageModal(false)}
            >
              CANCEL
            </button>
            <button
              className="bg-green-pastel font-monument text-indigo-white w-full h-8 tracking-widest text-center text-sm"
              onClick={(e) => {
                setGameImage(radioValue);
                setImageModal(false);
              }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

// export async function getServerSideProps(ctx) {
//   return {
//     redirect: {
//       destination: '/Portfolio',
//       permanent: false,
//     },
//   };
// }
