export type packStorageABI = [
  {
    inputs: [
      {
        internalType: 'address';
        name: '_tokenAddress';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: '_packPrice';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: '_tokenURI';
        type: 'string';
      }
    ];
    stateMutability: 'nonpayable';
    type: 'constructor';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: 'address';
        name: 'account';
        type: 'address';
      },
      {
        indexed: true;
        internalType: 'address';
        name: 'operator';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'bool';
        name: 'approved';
        type: 'bool';
      }
    ];
    name: 'ApprovalForAll';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'amount';
        type: 'uint256';
      }
    ];
    name: 'Burn';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: 'address';
        name: 'previousOwner';
        type: 'address';
      },
      {
        indexed: true;
        internalType: 'address';
        name: 'newOwner';
        type: 'address';
      }
    ];
    name: 'OwnershipTransferred';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: 'address';
        name: 'account';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'amount';
        type: 'uint256';
      },
      {
        indexed: false;
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      }
    ];
    name: 'PackMinted';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: 'address';
        name: 'sender';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'string';
        name: 'text';
        type: 'string';
      }
    ];
    name: 'TextLogged';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: 'address';
        name: 'operator';
        type: 'address';
      },
      {
        indexed: true;
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        indexed: true;
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      },
      {
        indexed: false;
        internalType: 'uint256[]';
        name: 'values';
        type: 'uint256[]';
      }
    ];
    name: 'TransferBatch';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: 'address';
        name: 'operator';
        type: 'address';
      },
      {
        indexed: true;
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        indexed: true;
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'value';
        type: 'uint256';
      }
    ];
    name: 'TransferSingle';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'string';
        name: 'value';
        type: 'string';
      },
      {
        indexed: true;
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      }
    ];
    name: 'URI';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      },
      {
        indexed: false;
        internalType: 'string';
        name: '_tokenMetadata';
        type: 'string';
      }
    ];
    name: 'tokenPackMetadata';
    type: 'event';
  },
  {
    inputs: [
      {
        internalType: 'string';
        name: 'metadataURI';
        type: 'string';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: '_setPackURI';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'adminBurn';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'adminMint';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      }
    ];
    name: 'balanceOf';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address[]';
        name: 'accounts';
        type: 'address[]';
      },
      {
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      }
    ];
    name: 'balanceOfBatch';
    outputs: [
      {
        internalType: 'uint256[]';
        name: '';
        type: 'uint256[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'burn';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    name: 'getContractTokenBalance';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'getMintedTokens';
    outputs: [
      {
        internalType: 'bool';
        name: '';
        type: 'bool';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'getPackPrice';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'getTokenMetadata';
    outputs: [
      {
        internalType: 'string';
        name: '';
        type: 'string';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'getTokenStorageByOwner';
    outputs: [
      {
        internalType: 'uint256[]';
        name: '';
        type: 'uint256[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'getTokenStorageSupplyByOwner';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'getTotalPacksMinted';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'getUserTokenBalance';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      },
      {
        internalType: 'address';
        name: 'operator';
        type: 'address';
      }
    ];
    name: 'isApprovedForAll';
    outputs: [
      {
        internalType: 'bool';
        name: '';
        type: 'bool';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: '_amount';
        type: 'uint256';
      }
    ];
    name: 'mintPacks';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    name: 'owner';
    outputs: [
      {
        internalType: 'address';
        name: '';
        type: 'address';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'packPrice';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'renounceOwnership';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'amounts';
        type: 'uint256[]';
      },
      {
        internalType: 'bytes';
        name: 'data';
        type: 'bytes';
      }
    ];
    name: 'safeBatchTransferFrom';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'amount';
        type: 'uint256';
      },
      {
        internalType: 'bytes';
        name: 'data';
        type: 'bytes';
      }
    ];
    name: 'safeTransferFrom';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'operator';
        type: 'address';
      },
      {
        internalType: 'bool';
        name: 'approved';
        type: 'bool';
      }
    ];
    name: 'setApprovalForAll';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: '_newPrice';
        type: 'uint256';
      }
    ];
    name: 'setPackPrice';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'string';
        name: '_newTokenURI';
        type: 'string';
      }
    ];
    name: 'setTokenURI';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'bytes4';
        name: 'interfaceId';
        type: 'bytes4';
      }
    ];
    name: 'supportsInterface';
    outputs: [
      {
        internalType: 'bool';
        name: '';
        type: 'bool';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'token';
    outputs: [
      {
        internalType: 'contract IERC20';
        name: '';
        type: 'address';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'tokenAddress';
    outputs: [
      {
        internalType: 'address';
        name: '';
        type: 'address';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'tokenURI';
    outputs: [
      {
        internalType: 'string';
        name: '';
        type: 'string';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'newOwner';
        type: 'address';
      }
    ];
    name: 'transferOwnership';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_tokenAddress';
        type: 'address';
      }
    ];
    name: 'updateERC20TokenAddress';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_openPackAddr';
        type: 'address';
      }
    ];
    name: 'updateOpenPackAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_packLogicAddr';
        type: 'address';
      }
    ];
    name: 'updatePackLogicAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      }
    ];
    name: 'uri';
    outputs: [
      {
        internalType: 'string';
        name: '';
        type: 'string';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  }
];
