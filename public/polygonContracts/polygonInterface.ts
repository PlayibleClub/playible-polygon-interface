// utils/polygonContracts/polygonInterface.ts
interface promotionalPackNFT {
  getTokenMetadataById(tokenId: number): Promise<string>;
  getTokensByOwner(
    account: string,
    fromIndex: number,
    limit: number
  ): Promise<[number, number[], string[]]>;
  getTokenSupplyByOwner(account: string): Promise<number>;
  claimSoulboundPack(): Promise<void>;
  checkClaimStatus(account: string): Promise<boolean>;
  // Add any other functions or properties here as needed
}

interface packNFTStorage {
  getUserTokenBalance(): Promise<number>;
  getPackPrice(): Promise<number>;
  mintPacks(amount: number): Promise<void>;
}

interface packNFTLogic {
  getTokenMetadataById(tokenId: number): Promise<string>;
  getTokensByOwner(
    account: string,
    fromIndex: number,
    limit: number
  ): Promise<[number, number[], string[]]>;
  getTokenSupplyByOwner(account: string): Promise<number>;
}

export type { promotionalPackNFT, packNFTStorage, packNFTLogic };
