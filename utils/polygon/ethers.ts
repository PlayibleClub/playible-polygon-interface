// src/utils/ethers.js
import { Contract } from 'web3-eth-contract';
// import { packNFTStorage, promotionalPackNFT, packNFTLogic } from 'utils/polygon/polygonInterface';
import { packStorageABI } from 'public/polygonContracts/contractABI/pack_nft';
import { packLogicABI } from 'public/polygonContracts/contractABI/pack_nft_logic';
import promotional_pack_nft from 'public/polygonContracts/contractABI/promotional_pack_nft.json';
import pack_nft_storage from 'public/polygonContracts/contractABI/pack_nft.json';
import pack_nft_logic from 'public/polygonContracts/contractABI/pack_nft_logic.json';

const promoPackContractAddress = '0xecdf1d718adf8930661a80b37bdbda83fdc538e3';
const regularPackStorageContractAddress = '0x672DBaFAE1F18642c0Ed845ab8bD5824a6F2D502';
const regularPackLogicContractAddress = '0xc101792c937A61b39118083d470ad3bE4c5FC6D5';

const packStorageContractABI = pack_nft_storage as unknown as packStorageABI;
const packLogicContractABI = pack_nft_logic as unknown as packLogicABI;

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
      const contract = new Contract(packLogicContractABI, regularPackLogicContractAddress);
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
      const contract = new Contract(packLogicContractABI, regularPackLogicContractAddress);
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
      const contract = new Contract(packLogicContractABI, regularPackLogicContractAddress);
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

export async function mintRegularPacks(amount, accountId) {
  try {
    if (window.ethereum) {
      console.log('Mint packs function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      //@ts-ignore
      const contract = new Contract(packStorageContractABI, regularPackStorageContractAddress);
      contract.setProvider(window.ethereum);

      // Call mint regular packs function
      const transaction = await contract.methods
        .mintPacks(amount)
        .send({ from: accountId, gas: '200000', gasPrice: '20000000000' });
      console.log('Regular Pack minted successfully');

      return transaction;
    }
  } catch (error) {
    console.error('Error minting regular pack:', error);
  }
}

export async function fetchAccountBalance(accountId) {
  try {
    if (window.ethereum) {
      console.log('Fetch account balance called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packStorageContractABI, regularPackStorageContractAddress);
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
      const contract = new Contract(packStorageContractABI, regularPackStorageContractAddress);
      contract.setProvider(window.ethereum);

      // Call the get regular pack price function
      const price = await contract.methods.getPackPrice().call();

      console.log('Pack price fetch successfully:', price);
      return price;
    }
  } catch (error) {
    console.error('Error fetching account balance:', error);
  }
}

export async function checkTokenOwner(account, id) {
  try {
    if (window.ethereum) {
      console.log('Fetch check token owner called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicContractABI, regularPackLogicContractAddress);
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
