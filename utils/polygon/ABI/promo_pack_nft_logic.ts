export type promoPackLogicABI = [
  {
    inputs: [
      {
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'adminResetSoulboundClaim';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
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
        name: 'account';
        type: 'address';
      }
    ];
    name: 'sendPromoTokensForMinting';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    name: 'sendSoulboundTokensForMinting';
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
    inputs: [
      {
        internalType: 'address';
        name: '_promoPackStorageAddr';
        type: 'address';
      }
    ];
    name: 'updatePromoPackStorageAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
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
        internalType: 'address';
        name: 'receiverAddr';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'tokensMinted';
    type: 'event';
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
      }
    ];
    name: 'checkClaimStatus';
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
        name: 'tokenType';
        type: 'uint256';
      }
    ];
    name: 'getNewTokenId';
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
        name: 'owner';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'getPromoTokenOwner';
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
    name: 'getTokenMetadataById';
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
      },
      {
        internalType: 'uint256';
        name: 'fromIndex';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'limit';
        type: 'uint256';
      }
    ];
    name: 'getTokensByOwner';
    outputs: [
      {
        internalType: 'uint256';
        name: '';
        type: 'uint256';
      },
      {
        internalType: 'uint256[]';
        name: '';
        type: 'uint256[]';
      },
      {
        internalType: 'string[]';
        name: '';
        type: 'string[]';
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
    name: 'getTokenSupplyByOwner';
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
