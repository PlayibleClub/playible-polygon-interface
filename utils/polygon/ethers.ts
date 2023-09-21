// src/utils/ethers.js
import { ethers } from 'ethers';
import promotionalPackNFT from 'utils/polygonContracts/promotionalPackNFT';
import promotional_pack_nft from '../polygonContracts/contractABI/promotional_pack_nft.json';

const promoPackContractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3';

export async function fetchTokenMetadata(tokenId) {
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

export async function fetchTokensByOwner(account, fromIndex, limit) {
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

export async function fetchTokenSupplyByOwner(account) {
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
