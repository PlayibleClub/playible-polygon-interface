// src/utils/ethers.js
import { Contract } from 'web3-eth-contract';
// import {
//   packNFTStorage,
//   promotionalPackNFT,
//   packNFTLogic,
//   AthleteLogic,
// } from 'utils/polygon/polygonInterface';
import { convertPolygonNftToAthlete, getAthleteInfoByApiId } from 'utils/athlete/helper';
import Web3 from 'web3';
import { packStorageABI } from 'utils/polygon/ABI/pack_nft';
import { packLogicABI } from 'utils/polygon/ABI/pack_nft_logic';
import promotional_pack_nft from 'utils/polygon/ABI/promotional_pack_nft.json';
import pack_nft_storage from 'utils/polygon/ABI/pack_nft.json';
import pack_nft_logic from 'utils/polygon/ABI/pack_nft_logic.json';
import athlete_logic from '../polygon/ABI/athletelogic_abi.json';
import game_storage from '../polygon/ABI/gamestorage_abi.json';
import game_logic from '../polygon/ABI/gamelogic_abi.json';
import athlete_storage from '../polygon/ABI/athletestorage_abi.json';
import { AthleteStorageABI, AthleteLogicABI } from '../polygon/ABI/athleteABIs';
import { GameStorageABI, GameLogicABI } from '../polygon/ABI/gameABIs';
import { isWindows } from 'react-device-detect';

const promoPackContractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3';
// const regularPackStorageContractAddress = '0x672DBaFAE1F18642c0Ed845ab8bD5824a6F2D502';
const regularPackNFLStorageContractAddress = '0x0B0f1766f78cf70bAcA70AF09Ac8DDd8Fce77D4F';
const regularPackNFLLogicContractAddress = '0xCa49D6474f59479680b8b6EC3db7b5f6f0d17b24';
const regularNFLAthleteStorageAddress = '0x32ec30629f306261a8c38658d0dc4b2e1c493585';
//const regularNFLAthleteLogicAddress = '0x6b53db22961B40c89F82a6C47Fe8d138Efd4cdDc';
const regularNFLAthleteLogicAddress = '0xD5Ac1637dAC23cD4b25542cee92664b7646F7e53';
const gameNFLStorageAddress = '0x769450D2Eb8fD1F810E75131eC91A7E0E96fd497';
const gameNFLLogicAddress = '0xfA3114b61621110458738b033B966B9813019865';
const packStorageNFLContractABI = pack_nft_storage as unknown as packStorageABI;
const packLogicNFLContractABI = pack_nft_logic as unknown as packLogicABI;

// export async function fetchPromoPackTokenMetadata(tokenId) {
//   try {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);

//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       // Instantiate your ERC1155 contract
//       const PromotionalPackNFT = new ethers.Contract(
//         promoPackContractAddress,
//         promotional_pack_nft,
//         await provider.getSigner()
//       ) as unknown as promotionalPackNFT;

//       // Call the getTokenMetadataById function
//       const metadata = await PromotionalPackNFT.getTokenMetadataById(tokenId);

//       return metadata;
//     }
//   } catch (error) {
//     console.error('Error fetching token metadata:', error);
//     return null;
//   }
// }

// export async function fetchPromoPackTokensByOwner(account, fromIndex, limit) {
//   try {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);

//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const PromotionalPackNFT = new ethers.Contract(
//         promoPackContractAddress,
//         promotional_pack_nft,
//         await provider.getSigner()
//       ) as unknown as promotionalPackNFT;

//       const [count, tokenIds, metadata] = await PromotionalPackNFT.getTokensByOwner(
//         account,
//         fromIndex,
//         limit
//       );

//       return { count, tokenIds, metadata };
//     }
//   } catch (error) {
//     console.error('Error fetching tokens by owner:', error);
//   }
// }

// export async function fetchPromoPackTokenSupplyByOwner(account) {
//   try {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);

//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const PromotionalPackNFT = new ethers.Contract(
//         promoPackContractAddress,
//         promotional_pack_nft,
//         await provider.getSigner()
//       ) as unknown as promotionalPackNFT;

//       const tokenSupply = await PromotionalPackNFT.getTokenSupplyByOwner(account);
//       return tokenSupply;
//     }
//   } catch (error) {
//     console.error('Error fetching token supply by owner:', error);
//   }
// }

// export async function fetchClaimSoulboundStatus(account) {
//   try {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);

//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const PromotionalPackNFT = new ethers.Contract(
//         promoPackContractAddress,
//         promotional_pack_nft,
//         await provider.getSigner()
//       ) as unknown as promotionalPackNFT;
//       // Call the checkClaimStatus function
//       const isClaimed = await PromotionalPackNFT.checkClaimStatus(account);

//       return isClaimed;
//     }
//   } catch (error) {
//     console.error('Error checking claim status:', error);
//     return null;
//   }
// }

// export async function claimSoulboundPack() {
//   try {
//     if (window.ethereum) {
//       const provider = new ethers.BrowserProvider(window.ethereum);

//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const PromotionalPackNFT = new ethers.Contract(
//         promoPackContractAddress,
//         promotional_pack_nft,
//         await provider.getSigner()
//       ) as unknown as promotionalPackNFT;

//       // Call the claimSoulboundPack function
//       const transaction = await PromotionalPackNFT.claimSoulboundPack();
//       console.log('Soulbound Pack claimed successfully');

//       return transaction;
//     }
//   } catch (error) {
//     console.error('Error claiming Soulbound Pack:', error);
//   }
// }

export async function fetchRegularPackTokenMetadata(tokenId) {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack tokens for owner function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicNFLContractABI, regularPackNFLLogicContractAddress);
      contract.setProvider(window.ethereum);

      const metadata = await contract.methods.getTokenMetadataById(tokenId).call();
      console.log('Pack Token metadata fetched successfully');
      return metadata;
    }
  } catch (error) {
    console.error('Error fetching regular pack token metadata:', error);
    return null;
  }
}

export async function fetchRegularPackTokensByOwner(account, fromIndex, limit) {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack tokens for owner function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicNFLContractABI, regularPackNFLLogicContractAddress);
      contract.setProvider(window.ethereum);

      const response = await contract.methods
        .getTokensByOwner(account, fromIndex, limit)
        .call({ from: account });

      return response;
    }
  } catch (error) {
    console.error('Error fetching regular tokens by owner:', error);
  }
}

export async function fetchRegularPackTokenSupplyByOwner(account) {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack token supply function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      //@ts-ignore
      const contract = new Contract(packLogicNFLContractABI, regularPackNFLLogicContractAddress);
      contract.setProvider(window.ethereum);

      const tokenSupply = await contract.methods
        .getTokenSupplyByOwner(account)
        .call({ from: account });
      return tokenSupply;
    }
  } catch (error) {
    console.error('Error fetching regular token supply by owner:', error);
  }
}

export async function fetchAccountBalance(accountId) {
  try {
    if (window.ethereum) {
      console.log('Fetch account balance called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(
        packStorageNFLContractABI,
        regularPackNFLStorageContractAddress
      );
      contract.setProvider(window.ethereum);

      // Call the get account balance function
      const balance = await contract.methods.getUserTokenBalance().call({ from: accountId });
      console.log('Account balance fetched successfully');

      return balance;
    }
  } catch (error) {
    console.error('Error fetching account balance:', error);
  }
}
export async function fetchRegularPackPrice() {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack price called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(
        packStorageNFLContractABI,
        regularPackNFLStorageContractAddress
      );
      contract.setProvider(window.ethereum);

      // Call the get regular pack price function
      const price = await contract.methods.getPackPrice().call();

      console.log('Pack price fetch successfully:', price);
      return price;
    }
  } catch (error) {
    console.error('Error fetching pack price:', error);
  }
}

export async function fetchMintedTokenAmount(accountId) {
  try {
    if (window.ethereum) {
      console.log('Fetch minted token amount called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicNFLContractABI, regularPackNFLLogicContractAddress);
      contract.setProvider(window.ethereum);

      // Call the get regular pack price function
      const tokensMintedAmount = await contract.methods
        .getMintedTokensAmount()
        .call({ from: accountId });

      console.log('Amount of minted tokens fetch successfully:', tokensMintedAmount);
      return tokensMintedAmount;
    }
  } catch (error) {
    console.error('Error fetching amount of tokens minted:', error);
  }
}

export async function checkTokenOwner(account, id) {
  try {
    if (window.ethereum) {
      console.log('Fetch check token owner called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicNFLContractABI, regularPackNFLLogicContractAddress);
      contract.setProvider(window.ethereum);

      // Call the getTokenOwner function
      const isToken = await contract.methods.getTokenOwner(account, id).call({ from: account });
      console.log('Token:', isToken);
      console.log('Token owner fetched successfully');

      return isToken;
    }
  } catch (error) {
    console.error('Error fetching check token owner:', error);
  }
}

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
      const abi = athlete_logic as unknown as AthleteLogicABI;
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, regularNFLAthleteLogicAddress);
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

      const abi = athlete_logic as unknown as AthleteLogicABI;
      console.log(position);
      console.log(`Supply check: ${supply}`);
      console.log(`Athlete limit : ${athleteLimit}`);
      console.log(`Name: ${name}`);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, regularNFLAthleteLogicAddress);
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
      const abi = athlete_logic as unknown as AthleteLogicABI;
      const contract = new Contract(abi, regularNFLAthleteLogicAddress);
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

export async function fetchAllGames() {
  try {
    if (window.ethereum) {
      console.log('call function');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const abi = game_storage as unknown as GameStorageABI;
      const contract = new Contract(abi, gameNFLStorageAddress);
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
      const contract = new Contract(abi, gameNFLStorageAddress);
      contract.setProvider(window.ethereum);
      const result = await contract.methods.getGameInfo(gameId).call({ gas: '30000000' });
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
      const contract = new Contract(abi, gameNFLStorageAddress);
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
      const contract = new web3.eth.Contract(abi, gameNFLLogicAddress);

      const gasEstimate = await contract.methods
        .submitLineup(gameId, teamName, tokenIds, tokenPromoIds, lineup, apiIds, 0)
        .estimateGas({ from: accountId });
      console.log(`Estimated gas: ${gasEstimate}`);
      console.log('test');
      const gasPrice = await web3.eth.getGasPrice();
      const tx = {
        from: accountId,
        to: gameNFLLogicAddress,
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
