// src/utils/ethers.js
import { ethers } from 'ethers';
import {
  packNFTStorage,
  promotionalPackNFT,
  packNFTLogic,
} from 'utils/polygonContracts/polygonInterface';
import promotional_pack_nft from '../polygonContracts/contractABI/promotional_pack_nft.json';
import pack_nft_storage from '../polygonContracts/contractABI/pack_nft.json';
import pack_nft_logic from '../polygonContracts/contractABI/pack_nft_logic.json';

const promoPackContractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3';
const regularPackStorageContractAddress = '0x4E2A0c5fd245F33784F3d642DD881Cb3BCA5a8E4';
const regularPackLogicContractAddress = '0x3C581DCBB567cFE86395820bA0a37715C1195dEC';

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
      const balance = await packNFTStorage.getUserTokenBalance();
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
        await provider.getSigner()
      ) as unknown as packNFTStorage;

      // Call the claimSoulboundPack function
      const price = await packNFTStorage.getPackPrice();
      console.log('Pack price fetched successfully');

      return price;
    }
  } catch (error) {
    console.error('Error fetching pack price:', error);
  }
}
