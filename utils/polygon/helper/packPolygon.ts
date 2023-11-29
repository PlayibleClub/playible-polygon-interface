import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { packStorageABI } from 'utils/polygon/ABI/pack_nft';
import { packLogicABI } from 'utils/polygon/ABI/pack_nft_logic';
import { promoPackStorageABI } from 'utils/polygon/ABI/promo_pack_nft';
import { promoPackLogicABI } from '../ABI/promo_pack_nft_logic';
import pack_nft_storage from 'utils/polygon/ABI/pack_nft.json';
import pack_nft_logic from 'utils/polygon/ABI/pack_nft_logic.json';
import promo_pack_nft_storage from 'utils/polygon/ABI/promo_pack_nft.json';
import promo_pack_nft_logic from 'utils/polygon/ABI/promo_pack_nft_logic.json';
import { PACK_NFL_POLYGON } from 'data/constants/polygonContracts';
import { PROMO_PACK_NFL_POLYGON } from 'data/constants/polygonContracts';
import { getConfig } from 'utils/polygon';

const packStorageNFLContractABI = pack_nft_storage as unknown as packStorageABI;
const packLogicNFLContractABI = pack_nft_logic as unknown as packLogicABI;
const promoPackStorageNFLContractABI = promo_pack_nft_storage as unknown as promoPackStorageABI;
const promoPackLogicNFLContractABI = promo_pack_nft_logic as unknown as promoPackLogicABI;

export async function fetchPackTokenMetadata(tokenId, type) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        address = PACK_NFL_POLYGON[getConfig()].logic;
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
      }
      console.log('Fetch regular pack tokens for owner function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, address);
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

export async function fetchPackTokensByOwner(account, fromIndex, limit, type) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        address = PACK_NFL_POLYGON[getConfig()].logic;
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
      }
      console.log('Fetch regular pack tokens for owner function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, address);
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

export async function fetchPackTokenSupplyByOwner(account, type) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        address = PACK_NFL_POLYGON[getConfig()].logic;
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
      }
      console.log('Fetch regular pack tokens for owner function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, address);
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

export async function fetchFilteredMixedTokensByOwner(
  accountId,
  isPromoPage,
  athleteOffset,
  promoOffset,
  totalRegularSupply,
  totalPromoSupply,
  packLimit
) {
  console.log({
    regular: totalRegularSupply,
    promo: totalPromoSupply,
  });
  return await fetchPackTokensByOwner(
    accountId,
    isPromoPage ? athleteOffset + promoOffset : athleteOffset,
    isPromoPage ? totalPromoSupply : totalRegularSupply,
    isPromoPage ? 'promo' : 'regular'
  ).then(async (result) => {
    if (result.length < packLimit && !isPromoPage && totalPromoSupply !== 0) {
      let sbLimit = packLimit - result.length;
      let arrayToReturn = await fetchPackTokensByOwner(
        accountId,
        sbLimit,
        totalPromoSupply,
        'promo'
      ).then((result2) => {
        result2.map((obj) => result.push(obj));
        return result;
      });
      console.log('arrayToReturn:', arrayToReturn);
      return arrayToReturn;
    } else {
      return result;
    }
  });
}

export async function fetchAccountBalance(accountId) {
  try {
    if (window.ethereum) {
      console.log('Fetch account balance called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(
        packStorageNFLContractABI,
        PACK_NFL_POLYGON[getConfig()].storage
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
        PACK_NFL_POLYGON[getConfig()].storage
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
      const contract = new Contract(packLogicNFLContractABI, PACK_NFL_POLYGON[getConfig()].logic);
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

export async function checkTokenOwner(account, id, type) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        address = PACK_NFL_POLYGON[getConfig()].logic;
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
      }
      console.log('Fetch check token owner called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicNFLContractABI, PACK_NFL_POLYGON[getConfig()].logic);
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

export async function claimSoulboundPack(account) {
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum) {
        console.log('Fetch claim soulbound pack function called');
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(
          promoPackLogicNFLContractABI,
          PROMO_PACK_NFL_POLYGON[getConfig()].logic
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
          to: PROMO_PACK_NFL_POLYGON[getConfig()].logic,
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
            resolve(true);
          })
          .on('error', function (error) {
            console.error('Error:', error);
            reject(error);
          });
      }
    } catch (error) {
      console.error('Error claiming Soulbound Pack:', error);
      reject(error);
    }
  });
}

export async function fetchClaimSoulboundStatus(account) {
  try {
    if (window.ethereum) {
      console.log('Fetch claim soulbound status function called');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(
        promoPackLogicNFLContractABI,
        PROMO_PACK_NFL_POLYGON[getConfig()].logic
      );
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
