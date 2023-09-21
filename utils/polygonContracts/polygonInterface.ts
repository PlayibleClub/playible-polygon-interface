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

interface packNFT {
  getTokenMetadataById(tokenId: number): Promise<string>;
  getTokensByOwner(
    account: string,
    fromIndex: number,
    limit: number
  ): Promise<[number, number[], string[]]>;
  getTokenSupplyByOwner(account: string): Promise<number>;
  getUserTokenBalance(): Promise<number>;
  getPackPrice(): Promise<number>;
  mintPacks(amount: number): Promise<void>;
}

interface AthleteLogic {
  getFilteredTokensForOwner(
    address: string,
    name: string,
    team: string,
    position: string
  ): Promise<string[]>; //might change if flat array is hard
}

export type { promotionalPackNFT, packNFT, AthleteLogic };
