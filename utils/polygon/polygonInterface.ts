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
  getUserTokenBalance(): Promise<any>;
  getPackPrice(): Promise<any>;
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
  getTokenOwner(account: string, tokenId: number): Promise<number>;
}

interface AthleteLogic {
  getFilteredTokenSupplyForOwner(
    address: string,
    position: string[],
    team: string,
    name: string
  ): Promise<any>;
  getFilteredTokensForOwner(
    address: string,
    name: string,
    team: string,
    position: string
  ): Promise<any[]>; //might change if flat array is hard

  getFilteredTokensForOwnerPagination(
    address: string,
    name: string,
    team: string,
    position: string,
    indexAndLimit: number[]
  );
  getExtraMetadataAndUri(tokenId: number): Promise<any[]>;

  getTokensForOwner(address: string): Promise<any[]>;
}
export type { promotionalPackNFT, packNFTStorage, packNFTLogic, AthleteLogic };
