// src/utils/ethers.js
import { ethers } from 'ethers';
import promotionalPackNFT from 'utils/polygonContracts/promotionalPackNFT';
import promotional_pack_nft from '../polygonContracts/contractABI/promotional_pack_nft.json';

export async function fetchTokenMetadata(tokenId) {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Replace with your contract address
      const contractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3';

      // Instantiate your ERC1155 contract
      const PromotionalPackNFT = new ethers.Contract(
        contractAddress,
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

      const contractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3'; // Replace with your contract address

      const PromotionalPackNFT = new ethers.Contract(
        contractAddress,
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

      const contractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3'; // Replace with your contract address

      const PromotionalPackNFT = new ethers.Contract(
        contractAddress,
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
