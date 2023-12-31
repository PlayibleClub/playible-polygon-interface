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
  tokenType: number;
  restrictedUntil: number;
};

export type PolygonLineup = {
  playerAddr: string;
  teamName: string;
  lineup: number[];
};
