import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import game_storage from '../ABI/gamestorage_abi.json';
import game_logic from '../ABI/gamelogic_abi.json';
import { GameStorageABI, GameLogicABI } from '../ABI/gameABIs';
import { GAME_NFL_POLYGON } from 'data/constants/polygonContracts';
import { AddGameType } from 'utils/game/helper';
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
    }
  } catch (e) {
    console.log(e);
  }
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
        .submitLineup(gameId, teamName, tokenIds, tokenPromoIds, lineup, apiIds, 0)
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
          .submitLineup(gameId, teamName, tokenIds, tokenPromoIds, lineup, apiIds, 0)
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
