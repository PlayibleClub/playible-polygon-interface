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
import { getConfig } from '..';
import { ATHLETE_NFL_POLYGON, PROMO_ATHLETE_NFL_POLYGON } from 'data/constants/polygonContracts';
import { getSportType } from 'data/constants/sportConstants';
export async function fetchFilteredAthleteSupplyForOwner(
  accountId,
  position,
  team,
  name,
  type,
  currentSport
) {
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
      let abi: RegularAthleteLogicABI | PromoAthleteLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = regular_athlete_logic as unknown as RegularAthleteLogicABI;
        address = ATHLETE_NFL_POLYGON[getConfig()].logic;
        address = getSportType(currentSport).regContract[getConfig()].logic;
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_athlete_logic as unknown as PromoAthleteLogicABI;
        address = getSportType(currentSport).promoContract[getConfig()].logic;
      }
      //const abi = promo_athlete_logic as unknown as PromoAthleteLogicABI;
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, address);
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
  supply,
  type,
  whitelist,
  currentSport
) {
  try {
    //console.log(`Athlete offset: ${athleteOffset}`);
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
      let abi: RegularAthleteLogicABI | PromoAthleteLogicABI;
      let address = '';
      console.log({
        type: type,
        supply: supply,
        offset: athleteOffset,
      });
      if (type === 'regular') {
        abi = regular_athlete_logic as unknown as RegularAthleteLogicABI;
        address = getSportType(currentSport).regContract[getConfig()].logic;
      } else if (type === 'promo' || type === 'soulbound') {
        console.log('promo query 23');
        abi = promo_athlete_logic as unknown as PromoAthleteLogicABI;
        address = getSportType(currentSport).promoContract[getConfig()].logic;
      }
      console.log(type);
      //console.log(position);
      // console.log(`Offset: ${athleteOffset}`);
      // console.log(`Supply check: ${supply}`);
      // console.log(`Athlete limit : ${athleteLimit}`);
      // console.log(`Name: ${name}`);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, address);
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
          console.log(result);
          return Promise.all(
            result
              .filter((item) => Number(item[0] !== 0 && item[3].length > 0))
              .map(convertPolygonNftToAthlete)
              .map((item) => getAthleteInfoByApiId(item, undefined, undefined, whitelist)) //for portfolio, assetdetails, and athleteselect
          );
        });
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchFilteredMixedTokensForOwner(
  accountId,
  isPromoPage,
  athleteOffset,
  promoOffset,
  totalRegularSupply,
  totalPromoSupply,
  athleteLimit,
  position,
  team,
  name,
  currentSport,
  whitelist
) {
  console.log({
    regular: totalRegularSupply,
    promo: totalPromoSupply,
  });
  return await fetchFilteredAthleteTokensForOwner(
    accountId,
    isPromoPage ? athleteOffset + promoOffset : athleteOffset,
    athleteLimit,
    position,
    team,
    name,
    isPromoPage ? totalPromoSupply : totalRegularSupply,
    isPromoPage ? 'promo' : 'regular',
    whitelist,
    currentSport
  ).then(async (result) => {
    if (result.length < athleteLimit && !isPromoPage && totalPromoSupply !== 0) {
      let sbLimit = athleteLimit - result.length;
      let arrayToReturn = await fetchFilteredAthleteTokensForOwner(
        accountId,
        0,
        sbLimit,
        position,
        team,
        name,
        totalPromoSupply,
        'promo',
        whitelist,
        currentSport
      ).then((result2) => {
        result2.map((obj) => result.push(obj));
        return result;
      });
      return arrayToReturn;
    } else {
      return result;
    }
  });
}
export async function fetchAthleteTokenMetadataAndURIById(
  tokenId: number,
  startTime,
  endTime,
  type,
  currentSport
) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      let abi: RegularAthleteLogicABI | PromoAthleteLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = regular_athlete_logic as unknown as RegularAthleteLogicABI;
        address = getSportType(currentSport).regContract[getConfig()].logic;
      } else if (type === 'promo' || type === 'soulbound') {
        console.log('promo query 23');
        abi = promo_athlete_logic as unknown as PromoAthleteLogicABI;
        address = getSportType(currentSport).promoContract[getConfig()].logic;
      }
      const contract = new Contract(abi, address);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getExtraMetadataAndUri(tokenId).call();

      const token = await getAthleteInfoByApiId(
        await convertPolygonNftToAthlete(result),
        startTime,
        endTime,
        [1, 2, 3] //whitelist, only used for AssetDetails so allow everything
      );

      return token;
    }
  } catch (error) {
    console.log(error);
  }
}
