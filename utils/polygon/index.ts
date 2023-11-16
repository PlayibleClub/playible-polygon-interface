const env = process.env.POLYGON_ENV;

export function getConfig() {
  switch (env) {
    case 'production':
      return 'mainnet';
    case 'development':
      return 'testnet';
  }
}

export function getContract(address) {
  switch (env) {
    case 'production':
      return address.mainnet;
    case 'development':
      return address.testnet;
  }
}
