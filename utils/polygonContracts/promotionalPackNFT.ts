// utils/polygonContracts/CustomERC1155.ts
interface promotionalPackNFT {
  ownerOf(tokenId: any): unknown;
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

export default promotionalPackNFT;
