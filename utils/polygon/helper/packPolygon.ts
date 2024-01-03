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
import {
  PACK_NBA_POLYGON,
  PROMO_PACK_NFL_POLYGON,
  PACK_NFL_POLYGON,
  WEB3,
  PROMO_PACK_NBA_POLYGON,
} from 'data/constants/polygonContracts';
import { getConfig } from 'utils/polygon';

const packStorageNFLContractABI = pack_nft_storage as unknown as packStorageABI;
const packLogicNFLContractABI = pack_nft_logic as unknown as packLogicABI;
const promoPackStorageNFLContractABI = promo_pack_nft_storage as unknown as promoPackStorageABI;
const promoPackLogicNFLContractABI = promo_pack_nft_logic as unknown as promoPackLogicABI;

export async function fetchPackTokenMetadata(tokenId, type, currentSport) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PACK_NBA_POLYGON[getConfig()].logic;
        }
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PROMO_PACK_NBA_POLYGON[getConfig()].logic;
        }
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

export async function fetchPackTokensByOwner(account, fromIndex, limit, type, currentSport) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PACK_NBA_POLYGON[getConfig()].logic;
        }
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PROMO_PACK_NBA_POLYGON[getConfig()].logic;
        }
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

export async function fetchPackTokenSupplyByOwner(account, type, currentSport) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PACK_NBA_POLYGON[getConfig()].logic;
        }
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PROMO_PACK_NBA_POLYGON[getConfig()].logic;
        }
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

export async function fetchAccountBalance(accountId, currentSport) {
  try {
    if (window.ethereum) {
      console.log('Fetch account balance called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(
        packStorageNFLContractABI,
        currentSport === 'FOOTBALL'
          ? PACK_NFL_POLYGON[getConfig()].storage
          : PACK_NBA_POLYGON[getConfig()].storage
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
export async function fetchRegularPackPrice(currentSport) {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack price called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(
        packStorageNFLContractABI,
        currentSport === 'FOOTBALL'
          ? PACK_NFL_POLYGON[getConfig()].storage
          : PACK_NBA_POLYGON[getConfig()].storage
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

export async function fetchMintedTokenAmount(accountId, currentSport) {
  let packAddress =
    currentSport === 'FOOTBALL'
      ? PACK_NFL_POLYGON[getConfig()].logic
      : PACK_NBA_POLYGON[getConfig()].logic;
  try {
    if (window.ethereum) {
      console.log('Fetch minted token amount called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicNFLContractABI, packAddress);
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

export async function checkTokenOwner(account, id, type, currentSport) {
  try {
    if (window.ethereum) {
      let abi: promoPackLogicABI | packLogicABI;
      let address = '';
      if (type === 'regular') {
        abi = pack_nft_logic as unknown as packLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PACK_NBA_POLYGON[getConfig()].logic;
        }
      } else if (type === 'promo' || type === 'soulbound') {
        abi = promo_pack_nft_logic as unknown as promoPackLogicABI;
        if (currentSport === 'FOOTBALL') {
          address = PROMO_PACK_NFL_POLYGON[getConfig()].logic;
        } else {
          address = PROMO_PACK_NBA_POLYGON[getConfig()].logic;
        }
      }
      console.log('Fetch check token owner called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(abi, address);
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

export async function claimSoulboundPack(account, currentSport) {
  let promoPackAddress =
    currentSport === 'FOOTBALL'
      ? PROMO_PACK_NFL_POLYGON[getConfig()].logic
      : PROMO_PACK_NBA_POLYGON[getConfig()].logic;
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum) {
        console.log('Fetch claim soulbound pack function called');
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(promoPackLogicNFLContractABI, promoPackAddress);

        // Estimate gas for mintPacks function
        console.log('Account:', account);
        const gasEstimate = await contract.methods
          .sendSoulboundTokensForMinting()
          .estimateGas({ from: account });
        console.log('Estimated Gas:', gasEstimate);

        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: account,
          to: promoPackAddress,
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
          })
          .catch(function (error) {
            //@ts-ignore
            alert(error);
            console.error('Error:', error);
          });
      }
    } catch (error) {
      console.error('Error claiming Soulbound Pack:', error);
      reject(error);
    }
  });
}

export async function fetchClaimSoulboundStatus(account, currentSport) {
  let promoPackAddress =
    currentSport === 'FOOTBALL'
      ? PROMO_PACK_NFL_POLYGON[getConfig()].logic
      : PROMO_PACK_NBA_POLYGON[getConfig()].logic;
  try {
    if (window.ethereum) {
      console.log('Fetch claim soulbound status function called');

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(promoPackLogicNFLContractABI, promoPackAddress);
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

export async function fetchMetamaskNetworkBalance(address) {
  const web3 = new Web3(WEB3[getConfig()]);

  await web3.eth
    .getBalance(address, 'latest') // 'latest' is an example block tag, you can use 'pending' or a block number
    .then((balance) => {
      // Handle the balance
      //TODO: TEST IF IT WILL WORK IF IT WAS MOVED TO polygonContracts
      //@ts-ignore
      console.log('Wallet:', address);
      console.log('Balance:', balance);
      return balance;
    })
    .catch((err) => {
      // Handle the error
      console.error('Error getting balance:', err);
      alert(err);
    });
}
