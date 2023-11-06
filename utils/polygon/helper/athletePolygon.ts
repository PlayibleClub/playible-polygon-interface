import { Contract } from 'web3-eth-contract';

import { convertPolygonNftToAthlete, getAthleteInfoByApiId } from 'utils/athlete/helper';
import Web3 from 'web3';
import regular_athlete_logic from '../ABI/regular_athlete_logic.json';
import regular_athlete_storage from '../ABI/regular_athlete_storage.json';
import promo_athlete_logic from '../ABI/promo_athlete_logic.json';
import promo_athlete_storage from '../ABI/promo_athlete_storage.json';
import {
  RegularAthleteStorageABI,
  RegularAthleteLogicABI,
  PromoAthleteLogicABI,
  PromoAthleteStorageABI,
} from '../ABI/athleteABIs';
import { ATHLETE_NFL_POLYGON } from 'data/constants/polygonContracts';

export async function fetchFilteredAthleteSupplyForOwner(accountId, position, team, name) {
  try {
    if (window.ethereum) {
      if (!/\S/.test(name)) {
        name = 'allNames';
      }
      // console.log('function called');
      // console.log(`Position: ${position}`);
      // console.log(`Team ${team}`);
      // console.log(`Name ${name}`);
      // console.log(`Address: ${accountId}`);
      //const provider = new Web3(window.ethereum);
      const abi = promo_athlete_logic as unknown as PromoAthleteLogicABI;
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, ATHLETE_NFL_POLYGON.logic);
      contract.setProvider(window.ethereum);
      const result = await contract.methods
        .getFilteredTokenSupplyForOwner(accountId, position, team, name)
        .call({ gas: '30000000' });
      console.log(result);
      return Number(result);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFilteredAthleteTokensForOwner(
  accountId,
  athleteOffset,
  athleteLimit,
  position,
  team,
  name,
  supply
) {
  try {
    console.log(`Athlete offset: ${athleteOffset}`);
    if (window.ethereum) {
      let result = [];
      if (supply === 0) {
        return result;
      }
      if (!/\S/.test(name)) {
        name = 'allNames';
      }
      if (supply < athleteLimit) {
        athleteLimit = supply;
      } else if (supply - athleteOffset < athleteLimit) {
        athleteLimit = supply % athleteLimit;
      }

      const abi = promo_athlete_logic as unknown as PromoAthleteLogicABI;
      console.log(position);
      console.log(`Supply check: ${supply}`);
      console.log(`Athlete limit : ${athleteLimit}`);
      console.log(`Name: ${name}`);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, ATHLETE_NFL_POLYGON.logic);
      contract.setProvider(window.ethereum);
      result = await contract.methods
        .getFilteredTokensForOwnerPagination(
          accountId,
          position,
          team,
          name,
          [athleteOffset, athleteLimit],
          supply
        )
        .call({ gas: '30000000' })
        .then((result) => {
          return Promise.all(
            result
              .filter((item) => Number(item[0] !== 0 && item[2].length > 0))
              .map(convertPolygonNftToAthlete)
              .map((item) => getAthleteInfoByApiId(item, undefined, undefined)) //for portfolio, assetdetails, and athleteselect
          );
        });
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchAthleteTokenMetadataAndURIById(tokenId: number, startTime, endTime) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = promo_athlete_logic as unknown as PromoAthleteLogicABI;
      const contract = new Contract(abi, ATHLETE_NFL_POLYGON.logic);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getExtraMetadataAndUri(tokenId).call();

      const token = await getAthleteInfoByApiId(
        await convertPolygonNftToAthlete(result),
        startTime,
        endTime
      );

      return token;
    }
  } catch (error) {
    console.log(error);
  }
}
