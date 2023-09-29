// src/utils/ethers.js
import { ethers } from 'ethers';
import {
  packNFTStorage,
  promotionalPackNFT,
  packNFTLogic,
  AthleteLogic,
} from 'utils/polygon/polygonInterface';
import { convertPolygonNftToAthlete, getAthleteInfoByApiId } from 'utils/athlete/helper';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import promotional_pack_nft from 'public/polygonContracts/contractABI/promotional_pack_nft.json';
import pack_nft_storage from 'public/polygonContracts/contractABI/pack_nft.json';
import pack_nft_logic from 'public/polygonContracts/contractABI/pack_nft_logic.json';
import athlete_logic from '../polygon/ABI/athletelogic_abi.json';
import athlete_storage from '../polygon/ABI/athletestorage_abi.json';
import { AthleteStorageABI, AthleteLogicABI } from '../polygon/ABI/athleteABIs';
import { isWindows } from 'react-device-detect';

const promoPackContractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3';
const regularPackStorageContractAddress = '0x672DBaFAE1F18642c0Ed845ab8bD5824a6F2D502';
const regularPackLogicContractAddress = '0xc101792c937A61b39118083d470ad3bE4c5FC6D5';
const regularNFLAthleteStorageAddress = '0x32ec30629f306261a8c38658d0dc4b2e1c493585';
//const regularNFLAthleteLogicAddress = '0x6b53db22961B40c89F82a6C47Fe8d138Efd4cdDc';
const regularNFLAthleteLogicAddress = '0x7454F97E507fBF1F65cf145ac3922d7c0cf9eB4C';

export async function fetchPromoPackTokenMetadata(tokenId) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Instantiate your ERC1155 contract
      const PromotionalPackNFT = new ethers.Contract(
        promoPackContractAddress,
        promotional_pack_nft,
        await provider.getSigner()
      ) as unknown as promotionalPackNFT;

      // Call the getTokenMetadataById function
      const metadata = await PromotionalPackNFT.getTokenMetadataById(tokenId);

      return metadata;
    }
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
}

export async function fetchPromoPackTokensByOwner(account, fromIndex, limit) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const PromotionalPackNFT = new ethers.Contract(
        promoPackContractAddress,
        promotional_pack_nft,
        await provider.getSigner()
      ) as unknown as promotionalPackNFT;

      const [count, tokenIds, metadata] = await PromotionalPackNFT.getTokensByOwner(
        account,
        fromIndex,
        limit
      );

      return { count, tokenIds, metadata };
    }
  } catch (error) {
    console.error('Error fetching tokens by owner:', error);
  }
}

export async function fetchPromoPackTokenSupplyByOwner(account) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const PromotionalPackNFT = new ethers.Contract(
        promoPackContractAddress,
        promotional_pack_nft,
        await provider.getSigner()
      ) as unknown as promotionalPackNFT;

      const tokenSupply = await PromotionalPackNFT.getTokenSupplyByOwner(account);
      return tokenSupply;
    }
  } catch (error) {
    console.error('Error fetching token supply by owner:', error);
  }
}

export async function fetchClaimSoulboundStatus(account) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const PromotionalPackNFT = new ethers.Contract(
        promoPackContractAddress,
        promotional_pack_nft,
        await provider.getSigner()
      ) as unknown as promotionalPackNFT;
      // Call the checkClaimStatus function
      const isClaimed = await PromotionalPackNFT.checkClaimStatus(account);

      return isClaimed;
    }
  } catch (error) {
    console.error('Error checking claim status:', error);
    return null;
  }
}

export async function claimSoulboundPack() {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const PromotionalPackNFT = new ethers.Contract(
        promoPackContractAddress,
        promotional_pack_nft,
        await provider.getSigner()
      ) as unknown as promotionalPackNFT;

      // Call the claimSoulboundPack function
      const transaction = await PromotionalPackNFT.claimSoulboundPack();
      console.log('Soulbound Pack claimed successfully');

      return transaction;
    }
  } catch (error) {
    console.error('Error claiming Soulbound Pack:', error);
  }
}

export async function fetchRegularPackTokenMetadata(tokenId) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Instantiate your ERC1155 contract
      const packNFTLogic = new ethers.Contract(
        regularPackLogicContractAddress,
        pack_nft_logic,
        await provider.getSigner()
      ) as unknown as packNFTLogic;

      const metadata = await packNFTLogic.getTokenMetadataById(tokenId);

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
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const packNFTLogic = new ethers.Contract(
        regularPackLogicContractAddress,
        pack_nft_logic,
        await provider.getSigner()
      ) as unknown as packNFTLogic;

      const [count, tokenIds, metadata] = await packNFTLogic.getTokensByOwner(
        account,
        fromIndex,
        limit
      );

      return { count, tokenIds, metadata };
    }
  } catch (error) {
    console.error('Error fetching regular tokens by owner:', error);
  }
}

export async function fetchRegularPackTokenSupplyByOwner(account) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const packNFTLogic = new ethers.Contract(
        regularPackLogicContractAddress,
        pack_nft_logic,
        await provider.getSigner()
      ) as unknown as packNFTLogic;

      const tokenSupply = await packNFTLogic.getTokenSupplyByOwner(account);
      return tokenSupply;
    }
  } catch (error) {
    console.error('Error fetching regular token supply by owner:', error);
  }
}

export async function mintRegularPacks(amount) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const packNFTStorage = new ethers.Contract(
        regularPackStorageContractAddress,
        pack_nft_storage,
        await provider.getSigner()
      ) as unknown as packNFTStorage;

      // Call the claimSoulboundPack function
      const transaction = await packNFTStorage.mintPacks(amount);
      console.log('Regular Pack minted successfully');

      return transaction;
    }
  } catch (error) {
    console.error('Error minting regular pack:', error);
  }
}

export async function fetchAccountBalance() {
  const abi = ['function getUserTokenBalance() view returns (uint256)'];
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      window.ethereum.request({ method: 'eth_requestAccounts' });

      const packNFTStorage = new ethers.Contract(
        regularPackStorageContractAddress,
        abi,
        await provider.getSigner()
      ) as unknown as packNFTStorage;

      console.log(packNFTStorage);

      // Call the claimSoulboundPack function
      const balance = packNFTStorage.getUserTokenBalance();
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
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const packNFTStorage = new ethers.Contract(
        regularPackStorageContractAddress,
        pack_nft_storage,
        await provider
      ) as unknown as packNFTStorage;

      // Call the claimSoulboundPack function
      const price = await packNFTStorage.getPackPrice();
      console.log('Price:', price);
      console.log('Pack price fetched successfully');

      return price;
    }
  } catch (error) {
    console.error('Error fetching pack price:', error);
  }
}

export async function checkTokenOwner(account, id) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const packNFTLogic = new ethers.Contract(
        regularPackLogicContractAddress,
        pack_nft_logic,
        await provider
      ) as unknown as packNFTLogic;

      // Call the claimSoulboundPack function
      const isToken = await packNFTLogic.getTokenOwner(account, id);
      console.log('Token:', isToken);
      console.log('Token owner fetched successfully');

      return isToken;
    }
  } catch (error) {
    console.error('Error fetching regular pack price:', error);
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
        .getFilteredTokenSupplyForOwner(
          '0x89F51006918A33244062eD1c5415253800640edA',
          position,
          team,
          name
        )
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
    if (window.ethereum) {
      if (!/\S/.test(name)) {
        name = 'allNames';
      }
      const abi = athlete_logic as unknown as AthleteLogicABI;
      console.log(`Supply check: ${supply}`);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, regularNFLAthleteLogicAddress);
      contract.setProvider(window.ethereum);
      const result = await contract.methods
        .getFilteredTokensForOwnerPagination(
          '0x89F51006918A33244062eD1c5415253800640edA',
          position,
          team,
          name,
          [athleteOffset, athleteLimit],
          supply
        )
        .call({ gas: '30000000' })
        .then((result) => {
          console.log('hello');
          return Promise.all(
            result
              .filter((item) => Number(item[0] !== 0 && item[2].length > 0))
              .map(convertPolygonNftToAthlete)
              .map((item) => getAthleteInfoByApiId(item, undefined, undefined))
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
