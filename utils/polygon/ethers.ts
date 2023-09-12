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
      const contractAddress = '0x0baD3cA8ABb78e21CD9096AFa0F6BC7e6b92a569';

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
