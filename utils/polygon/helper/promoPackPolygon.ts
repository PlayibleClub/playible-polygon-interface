import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { promoPackStorageABI } from 'utils/polygon/ABI/promo_pack_nft';
import { promoPackLogicABI } from 'utils/polygon/ABI/promo_pack_nft_logic';
import promo_pack_nft_storage from 'utils/polygon/ABI/promo_pack_nft.json';
import promo_pack_nft_logic from 'utils/polygon/ABI/promo_pack_nft_logic.json';
import { PROMO_PACK_NFL_POLYGON } from 'data/constants/polygonContracts';

const promoPackStorageNFLContractABI = promo_pack_nft_storage as unknown as promoPackStorageABI;
const promoPackLogicNFLContractABI = promo_pack_nft_logic as unknown as promoPackLogicABI;

export async function fetchPromoPackTokensByOwner(account, fromIndex, limit) {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack tokens for owner function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(promoPackLogicNFLContractABI, PROMO_PACK_NFL_POLYGON.logic);
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

export async function fetchPromoPackTokenSupplyByOwner(account) {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack token supply function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      //@ts-ignore
      const contract = new Contract(promoPackLogicNFLContractABI, PROMO_PACK_NFL_POLYGON.logic);
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

export async function fetchPromoPackTokenMetadata(tokenId) {
  try {
    if (window.ethereum) {
      console.log('Fetch promo pack metadata function called');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(promoPackLogicNFLContractABI, PROMO_PACK_NFL_POLYGON.logic);
      // Call the getTokenMetadataById function
      const metadata = await contract.methods.getTokenMetadataById(tokenId);

      return metadata;
    }
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
}

export async function fetchClaimSoulboundStatus(account) {
  try {
    if (window.ethereum) {
      console.log('Fetch claim soulbound status function called');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(promoPackLogicNFLContractABI, PROMO_PACK_NFL_POLYGON.logic);
      contract.setProvider(window.ethereum);
      // Call the checkClaimStatus function
      const isClaimed = await contract.methods.checkClaimStatus(account).call({ from: account });

      return isClaimed;
    }
  } catch (error) {
    console.error('Error checking claim status:', error);
    return null;
  }
}

export async function claimSoulboundPack(account) {
  try {
    if (window.ethereum) {
      console.log('Fetch claim soulbound pack function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const web3 = new Web3(window.ethereum);

      const contract = new web3.eth.Contract(
        promoPackLogicNFLContractABI,
        PROMO_PACK_NFL_POLYGON.logic
      );

      // Estimate gas for mintPacks function
      console.log('Account:', account);
      const gasEstimate = await contract.methods
        .sendSoulboundTokensForMinting()
        .estimateGas({ from: account });
      console.log('Estimated Gas:', gasEstimate);

      const gasPrice = await web3.eth.getGasPrice();
      const tx = {
        from: account,
        to: PROMO_PACK_NFL_POLYGON.logic,
        //@ts-ignore
        gas: parseInt(gasEstimate),
        gasPrice: gasPrice,
        data: contract.methods.sendSoulboundTokensForMinting().encodeABI(),
      };
      // Call mint regular packs function
      web3.eth
        .sendTransaction(tx)
        .on('transactionHash', function (hash) {
          console.log('Transaction Hash:', hash);
        })
        //@ts-ignore
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log('Confirmation Number:', confirmationNumber);
          console.log('Receipt:', receipt);
          console.log('Soulbound Pack minted successfully');
        })
        .on('error', function (error) {
          console.error('Error:', error);
        });
    }
  } catch (error) {
    console.error('Error claiming Soulbound Pack:', error);
  }
}
