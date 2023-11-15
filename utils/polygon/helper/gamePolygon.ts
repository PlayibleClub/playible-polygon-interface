import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import game_storage from '../ABI/game_storage.json';
import game_logic from '../ABI/game_logic.json';
import { GameStorageABI, GameLogicABI } from '../ABI/gameABIs';
import { GAME_NFL_POLYGON } from 'data/constants/polygonContracts';
import { AddGameType } from 'utils/game/helper';
import { fetchAthleteTokenMetadataAndURIById } from './athletePolygon';
import { GET_LEADERBOARD_RESULT, GET_MULTI_CHAIN_LEADERBOARD_RESULT } from 'utils/queries';
import { SPORT_NAME_LOOKUP } from 'data/constants/sportConstants';
import client from 'apollo-client';
export async function fetchAllGames() {
  try {
    if (window.ethereum) {
      console.log('call function');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getAllGamesInfo().call({ gas: '30000000' });
      //console.log(result);
      return result;
    }
  } catch (e) {
    console.log(e);
  }
}
export async function fetchGame(gameId: number) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getGameInfo(gameId).call({ gas: '30000000' });
      return result;
    }
  } catch (e) {
    console.log(e);
  }
}
export async function fetchGameCounter() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getTotalGamesCounter().call();
      return result;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPlayerTeams(accountId, gameId: number) {
  try {
    if (window.ethereum) {
      console.log(accountId);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      const result = await contract.methods
        .getPlayerTeam(accountId, gameId)
        .call({ gas: '30000000', from: accountId });
      console.log(result);
      return result.teamNames;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPlayerLineup(accountId: string, gameId: number, teamName: string) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      let result = await contract.methods
        .getPlayerLineup(accountId, gameId, teamName)
        .call({ gas: '30000000', from: accountId });
      //console.log(result.lineup);
      const returnLineup = result.lineup.map((x) => {
        return Number(x);
      });
      return returnLineup;
    }
  } catch (e) {
    console.log(e);
  }
}
export async function fetchJoinedPlayerCount(accountId, gameId: number) {
  try {
    if (window.ethereum) {
      console.log(accountId);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.viewPlayerJoinedCounter(gameId).call();
      //console.log(result);
      return Number(result);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function fetchJoinedAddresses(accountId: string, gameId: number) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getAddressesJoinedInGame(gameId).call();
      // console.log(result);
      return result;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function fetchTeamsJoinedInGame(gameId: number) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, GAME_NFL_POLYGON.storage);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getTeamsJoinedInGame(gameId).call();

      return result;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function buildLeaderboard(
  playerLineups,
  currentSport,
  startTime,
  endTime,
  gameId,
  id,
  isMulti
) {
  const arrayToReturn = await Promise.all(
    playerLineups.map(async (item) => {
      let itemToReturn = {
        accountId: item.wallet_address,
        teamName: item.team_name,
        lineup: item.lineup !== undefined ? item.lineup : [],
        total: 0,
      };
      if (itemToReturn.lineup.length > 0) {
        //if lineup === 0, fetchTeamsJoinedInGame did not get a lineup for the address -> NEAR lineup
        itemToReturn.lineup = await Promise.all(
          itemToReturn.lineup.map((item) => {
            let type = item.toString()[0] === '1' ? 'regular' : 'promo';
            return fetchAthleteTokenMetadataAndURIById(item, startTime, endTime, type);
          })
        );
      }

      return itemToReturn;
    })
  );
  console.log(arrayToReturn);
  let leaderboardLineups;
  if (isMulti) {
    const { data } = await client.query({
      query: GET_MULTI_CHAIN_LEADERBOARD_RESULT,
      variables: {
        sport: 'nfl',
        gameId: parseFloat(id),
        chain: 'polygon',
      },
    });
    leaderboardLineups = data.getMultiChainLeaderboardResult;
  } else {
    const { data } = await client.query({
      query: GET_LEADERBOARD_RESULT,
      variables: {
        sport: 'nfl',
        gameId: parseFloat(gameId),
        contract: 'polygon',
      },
    });
    leaderboardLineups = data.getLeaderboardResult;
  }

  const merge = arrayToReturn.map((item) => ({
    ...item,
    ...leaderboardLineups.find(
      (newItem) =>
        newItem.team_name === item.teamName &&
        item.accountId.toLowerCase() === newItem.wallet_address.toLowerCase()
    ),
  }));
  console.log(merge);
  return merge;
}

export async function computeScores(lineup, currentSport, startTime, endTime) {
  const arrayToReturn = await Promise.all(
    lineup.map(async (item) => {
      let itemToReturn = {
        accountId: item.playerAddr,
        teamName: item.teamName,
        lineup: item.lineup,
        sumScore: 0,
      };

      itemToReturn.lineup = await Promise.all(
        itemToReturn.lineup.map((item) => {
          let type = item.toString()[0] === '1' ? 'regular' : 'promo';
          return fetchAthleteTokenMetadataAndURIById(item, startTime, endTime, type);
        })
      );
      // itemToReturn.lineup = itemToReturn.lineup.map((item) => {
      //   //console.log(item);
      //   return {
      //     ...item,
      //     stats_breakdown: item.fantasy_score,
      //     // item.stats_breakdown
      //     //   .filter((type) =>
      //     //     currentSport === SPORT_NAME_LOOKUP.football
      //     //       ? type.type === 'season' && type.played === 1
      //     //       : ''
      //     //   )
      //     //   .reduce((accumulator, item) => {
      //     //     return accumulator + item.fantasyScore;
      //     //   }, 0) || 0,
      //   };
      // });
      // itemToReturn.sumScore = itemToReturn.lineup.reduce((accumulator, object) => {
      //   return accumulator + object.stats_breakdown;
      // }, 0);
      return itemToReturn;
    })
  );
  // arrayToReturn.sort(function (a, b) {
  //   return b.sumScore - a.sumScore;
  // });
  return arrayToReturn;
}

export async function executeAddGame(args: AddGameType, accountId: string) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const abi = game_logic as unknown as GameLogicABI;
      const contract = new web3.eth.Contract(abi, GAME_NFL_POLYGON.logic);

      const gasEstimate = await contract.methods
        .addGameToStorage(
          args.gameId,
          args.gameStartTime,
          args.gameEndTime,
          args.whitelist,
          args.tokenTypeWhitelist,
          args.usageCost,
          args.positions,
          args.lineupLen,
          args.gameDescription,
          args.prizeDescription,
          args.gameImage
        )
        .estimateGas({ from: accountId });
      console.log(gasEstimate);
      const gasPrice = await web3.eth.getGasPrice();
      const tx = {
        from: accountId,
        to: GAME_NFL_POLYGON.logic,
        gas: Number(gasEstimate).toString(),
        gasPrice: gasPrice,
        data: contract.methods
          .addGameToStorage(
            args.gameId,
            args.gameStartTime,
            args.gameEndTime,
            args.whitelist,
            args.tokenTypeWhitelist,
            args.usageCost,
            args.positions,
            args.lineupLen,
            args.gameDescription,
            args.prizeDescription,
            args.gameImage
          )
          .encodeABI(),
      };
      web3.eth.sendTransaction(tx).on('transactionHash', (hash) => {
        console.log('Transaction submitted');
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function executeSubmitLineup(
  accountId,
  gameId,
  teamName,
  tokenIds,
  tokenPromoIds,
  lineup,
  apiIds
) {
  try {
    if (window.ethereum) {
      console.log(`Account id: ${accountId}`);
      console.log(`Game ID: ${gameId}`);
      console.log(`Team name: ${teamName}`);
      console.log(tokenIds);
      console.log(tokenPromoIds);
      console.log(lineup);
      console.log(apiIds);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const abi = game_logic as unknown as GameLogicABI;
      const contract = new web3.eth.Contract(abi, GAME_NFL_POLYGON.logic);

      const gasEstimate = await contract.methods
        .submitLineup(gameId, teamName, tokenIds, tokenPromoIds, lineup, apiIds)
        .estimateGas({ from: accountId });
      console.log(`Estimated gas: ${gasEstimate}`);
      console.log('test');
      const gasPrice = await web3.eth.getGasPrice();
      const tx = {
        from: accountId,
        to: GAME_NFL_POLYGON.logic,
        gas: Number(gasEstimate).toString(),
        gasPrice: gasPrice,
        data: contract.methods
          .submitLineup(gameId, teamName, tokenIds, tokenPromoIds, lineup, apiIds)
          .encodeABI(),
      };
      web3.eth.sendTransaction(tx).on('transactionHash', (hash) => {
        console.log(`Transaction hash: ${hash}`);
      });
    }
  } catch (e) {
    console.log(e);
  }
  // console.log(`Account id: ${accountId}`);
  // console.log(`Game ID: ${gameId}`);
  // console.log(`Team name: ${teamName}`);
  // console.log(tokenIds);
  // console.log(tokenPromoIds);
  // console.log(lineup);
  // console.log(apiIds);
}
