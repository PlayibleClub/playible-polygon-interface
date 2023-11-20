import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { packStorageABI } from 'utils/polygon/ABI/pack_nft';
import { packLogicABI } from 'utils/polygon/ABI/pack_nft_logic';
import pack_nft_storage from 'utils/polygon/ABI/pack_nft.json';
import pack_nft_logic from 'utils/polygon/ABI/pack_nft_logic.json';
import { PACK_NFL_POLYGON } from 'data/constants/polygonContracts';
import { getConfig } from 'utils/polygon';

const packStorageNFLContractABI = pack_nft_storage as unknown as packStorageABI;
const packLogicNFLContractABI = pack_nft_logic as unknown as packLogicABI;

export async function fetchRegularPackTokenMetadata(tokenId) {
  try {
    if (window.ethereum) {
      console.log('Fetch regular pack tokens for owner function called');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new Contract(packLogicNFLContractABI, PACK_NFL_POLYGON[getConfig()].logic);
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
      const contract = new Contract(packLogicNFLContractABI, PACK_NFL_POLYGON[getConfig()].logic);
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
      const contract = new Contract(packLogicNFLContractABI, PACK_NFL_POLYGON[getConfig()].logic);
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

export async function checkTokenOwner(account, id) {
  try {
    if (window.ethereum) {
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
