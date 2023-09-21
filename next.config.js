const withImages = require('next-images');

const customRedirects = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ComingSoon',
        permanent: false,
      },
      {
        source: '/Play',
        destination: '/ComingSoon',
        permanent: false,
        locale: false,
      },
      {
        source: '/MintPage',
        destination: '/ComingSoon',
        permanent: false,
        locale: false,
      },
      {
        source: '/Portfolio',
        destination: '/ComingSoon',
        permanent: false,
        locale: false,
      },
      {
        source: '/Packs',
        destination: '/ComingSoon',
        permanent: false,
        locale: false,
      },
    ];
  },
};

const customImages = {
  images: {
    domains: [
      'playible-api-production.s3.ap-southeast-1.amazonaws.com',
      'playible-game-image.s3-ap-southeast-1.amazonaws.com',
      'playible-game-image.s3.ap-southeast-1.amazonaws.com',
      'playible-api-dev.s3.ap-southeast-1.amazonaws.com',
      's3-us-west-2.amazonaws.com',
      'ipfs.filebase.io',
    ],
  },
  env: {
    NEAR_ENV: process.env.NEAR_ENV,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    ADMIN: process.env.ADMIN,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  },
};

const nextConfig = {
  ...customRedirects,
  ...customImages,
};

module.exports = withImages(nextConfig);