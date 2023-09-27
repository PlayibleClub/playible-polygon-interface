export type AthleteIPFSMetadata = {
  name: string;
  description: string;
  image: string;
  properties: {
    athleteId: string;
    symbol: string;
    name: string;
    team: string;
    position: string;
    animationLink: string;
  };
};

export type AthleteExtraMetadata = {
  tokenId: string;
  restrictedUntil: number;
};
