// src/utils/ethers.js
import { ethers } from 'ethers';
import { packNFT, promotionalPackNFT, AthleteLogic } from 'utils/polygonContracts/polygonInterface';
import { convertPolygonNftToAthlete, getAthleteInfoByApiId } from 'utils/athlete/helper';

import promotional_pack_nft from '../polygonContracts/contractABI/promotional_pack_nft.json';
import pack_nft from '../polygonContracts/contractABI/pack_nft.json';
import athlete_logic from '../polygonContracts/contractABI/athletelogic_abi.json';

const promoPackContractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3';
const regularPackContractAddress = '0xbAfd91F2AB0d596f55DD74657381A9D9E9029777';
const regularNFLAthleteStorageAddress = '0x5f577e912438A911C6205b17Abfd043AAfe2F6c3';
//const regularNFLAthleteLogicAddress = '0x6b53db22961B40c89F82a6C47Fe8d138Efd4cdDc';
const regularNFLAthleteLogicAddress = '0x3C8F88f0DF41585a38D62a953F0cB93904bDaAbB';
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
      const packNFT = new ethers.Contract(
        regularPackContractAddress,
        pack_nft,
        await provider.getSigner()
      ) as unknown as packNFT;

      const metadata = await packNFT.getTokenMetadataById(tokenId);

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

      const packNFT = new ethers.Contract(
        regularPackContractAddress,
        pack_nft,
        await provider.getSigner()
      ) as unknown as packNFT;

      const [count, tokenIds, metadata] = await packNFT.getTokensByOwner(account, fromIndex, limit);

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

      const packNFT = new ethers.Contract(
        regularPackContractAddress,
        pack_nft,
        await provider.getSigner()
      ) as unknown as packNFT;

      const tokenSupply = await packNFT.getTokenSupplyByOwner(account);
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

      const packNFT = new ethers.Contract(
        regularPackContractAddress,
        pack_nft,
        await provider.getSigner()
      ) as unknown as packNFT;

      // Call the claimSoulboundPack function
      const transaction = await packNFT.mintPacks(amount);
      console.log('Regular Pack minted successfully');

      return transaction;
    }
  } catch (error) {
    console.error('Error minting regular pack:', error);
  }
}

export async function fetchAccountBalance() {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const packNFT = new ethers.Contract(
        regularPackContractAddress,
        pack_nft,
        await provider.getSigner()
      ) as unknown as packNFT;

      // Call the claimSoulboundPack function
      const transaction = await packNFT.getUserTokenBalance();
      console.log('User account balance fetched successfully');

      return transaction;
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

      const packNFT = new ethers.Contract(
        regularPackContractAddress,
        pack_nft,
        await provider.getSigner()
      ) as unknown as packNFT;

      // Call the claimSoulboundPack function
      const transaction = await packNFT.getPackPrice();
      console.log('Pack price fetched successfully');

      return transaction;
    }
  } catch (error) {
    console.error('Error fetching pack price:', error);
  }
}

export async function fetchFilteredAthleteTokensForOwner(
  athleteOffset,
  athleteLimit,
  position,
  team,
  name
) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const athleteLogic = new ethers.Contract(
        regularNFLAthleteLogicAddress,
        athlete_logic,
        await provider.getSigner()
      ) as unknown as AthleteLogic;

      if (!/\S/.test(name)) {
        name = 'allNames';
      }
      console.log(`Offset: ${athleteOffset}`);
      console.log(`Limit: ${athleteLimit}`);
      console.log(`Position: ${position}`);
      console.log(`Team: ${team}`);
      console.log(`Name: ${name}`);
      const test = await athleteLogic.getFilteredTokensForOwnerPagination(
        '0x0a33941cDf52D5fFe93F17E6433673636A6C104c',
        position,
        team,
        name,
        [athleteOffset, athleteLimit]
      );
      console.log(test);
      const mapTest = Promise.all(
        test
          .filter((item) => Number(item[0]) !== 0 && item[2].length > 0)
          .map(convertPolygonNftToAthlete)
          .map((item) => getAthleteInfoByApiId(item, undefined, undefined))
      );

      //console.log(test[0][0]);
      return mapTest;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFilteredAthleteTokenSupplyForOwner(position, team, name) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      console.log(`Position: ${position}`);
      console.log(`Team: ${team}`);
      console.log(`Name: ${name}`);
      const athleteLogic = new ethers.Contract(
        regularNFLAthleteLogicAddress,
        athlete_logic,
        await provider.getSigner()
      ) as unknown as AthleteLogic;

      const supply = await athleteLogic.getFilteredTokenSupplyForOwner(
        '0x0a33941cDf52D5fFe93F17E6433673636A6C104c',
        position,
        team,
        name
      );
      console.log(`Supply: ${supply}`);
      return Number(supply);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchAthleteTokenMetadataAndURIById(tokenId: number, startTime, endTime) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const athleteLogic = new ethers.Contract(
        regularNFLAthleteLogicAddress,
        athlete_logic,
        await provider.getSigner()
      ) as unknown as AthleteLogic;

      const test = await athleteLogic.getExtraMetadataAndUri(tokenId);

      const token = await getAthleteInfoByApiId(
        await convertPolygonNftToAthlete(test),
        startTime,
        endTime
      );

      return token;
    }
  } catch (error) {
    console.log(error);
  }
}
