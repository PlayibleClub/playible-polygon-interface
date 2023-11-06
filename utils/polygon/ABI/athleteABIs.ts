export type RegularAthleteStorageABI = [
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
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'Paused';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
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
    name: 'TokenBurn';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'from';
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
        name: 'amounts';
        type: 'uint256[]';
      }
    ];
    name: 'TokenBurnBatch';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      }
    ];
    name: 'TokenTransfer';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      }
    ];
    name: 'TokenTransferBatch';
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
        internalType: 'uint256[]';
        name: 'tokens';
        type: 'uint256[]';
      }
    ];
    name: 'TokensMinted';
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
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'Unpaused';
    type: 'event';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'receiverAddr';
        type: 'address';
      },
      {
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'amount';
        type: 'uint256[]';
      }
    ];
    name: 'batchMintAthletes';
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
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'amount';
        type: 'uint256';
      }
    ];
    name: 'burnToken';
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
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'amounts';
        type: 'uint256[]';
      }
    ];
    name: 'burnTokenBatch';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    name: 'pause';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'tokenOwner';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'pushToOwnerTokenArray';
    outputs: [];
    stateMutability: 'nonpayable';
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
        name: 'tokenId';
        type: 'uint256';
      },
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'athleteId';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'symbol';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'name';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'team';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'position';
            type: 'string';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Athlete.TokenExtraMetadata';
        name: 'extra';
        type: 'tuple';
      }
    ];
    name: 'setTokenExtraMetadata';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'tokenURI';
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
    inputs: [];
    name: 'unpause';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_athleteLogicAddr';
        type: 'address';
      }
    ];
    name: 'updateAthleteLogicAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_gameAddr';
        type: 'address';
      }
    ];
    name: 'updateGameAddr';
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
    inputs: [];
    stateMutability: 'nonpayable';
    type: 'constructor';
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
    inputs: [];
    name: 'getAllAddresses';
    outputs: [
      {
        internalType: 'address[]';
        name: '';
        type: 'address[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'tokenOwner';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'getOwnerTokenIndex';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'index';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Athlete.IndexMapping';
        name: '';
        type: 'tuple';
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
    name: 'getTokenExtraMetadata';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'athleteId';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'symbol';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'name';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'team';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'position';
            type: 'string';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Athlete.TokenExtraMetadata';
        name: '';
        type: 'tuple';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'ownerAddr';
        type: 'address';
      }
    ];
    name: 'getTokensForOwner';
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
        name: 'ownerAddr';
        type: 'address';
      }
    ];
    name: 'getTokenSupplyForOwner';
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
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'nftTokenById';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            components: [
              {
                internalType: 'uint256';
                name: 'tokenId';
                type: 'uint256';
              },
              {
                internalType: 'string';
                name: 'athleteId';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'symbol';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'name';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'team';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'position';
                type: 'string';
              },
              {
                internalType: 'uint8';
                name: 'tokenType';
                type: 'uint8';
              },
              {
                internalType: 'uint256';
                name: 'restrictedUntil';
                type: 'uint256';
              },
              {
                internalType: 'bool';
                name: 'valid';
                type: 'bool';
              }
            ];
            internalType: 'struct Athlete.TokenExtraMetadata';
            name: 'metadata';
            type: 'tuple';
          }
        ];
        internalType: 'struct Athlete.TokenReturn';
        name: '';
        type: 'tuple';
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
    inputs: [];
    name: 'paused';
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
        name: 'tokenId';
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

export type RegularAthleteLogicABI = [
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
        internalType: 'uint256[]';
        name: 'tokens';
        type: 'uint256[]';
      }
    ];
    name: 'TokensMinted';
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
        name: 'receiverAddr';
        type: 'address';
      },
      {
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'amount';
        type: 'uint256[]';
      },
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'athleteId';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'symbol';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'name';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'team';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'position';
            type: 'string';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct IAthlete.TokenExtraMetadata[]';
        name: 'extra';
        type: 'tuple[]';
      }
    ];
    name: 'sendTokensForMinting';
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
        name: 'tokenId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'tokenURI';
        type: 'string';
      }
    ];
    name: 'setAthleteTokenURI';
    outputs: [];
    stateMutability: 'nonpayable';
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
        name: '_athleteStorageAddr';
        type: 'address';
      }
    ];
    name: 'updateAthleteStorageAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_gameAddr';
        type: 'address';
      }
    ];
    name: 'updateGameAddr';
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
        name: 'ownerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256';
        name: 'expireTime';
        type: 'uint256';
      },
      {
        components: [
          {
            internalType: 'string[]';
            name: 'positions';
            type: 'string[]';
          },
          {
            internalType: 'uint8';
            name: 'amount';
            type: 'uint8';
          }
        ];
        internalType: 'struct AthleteLogic.PositionsInfo[]';
        name: 'positions';
        type: 'tuple[]';
      }
    ];
    name: 'updateTokensRestriction';
    outputs: [
      {
        components: [
          {
            internalType: 'string[]';
            name: 'positions';
            type: 'string[]';
          },
          {
            internalType: 'uint8';
            name: 'amount';
            type: 'uint8';
          }
        ];
        internalType: 'struct AthleteLogic.PositionsInfo[]';
        name: '';
        type: 'tuple[]';
      }
    ];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    stateMutability: 'nonpayable';
    type: 'constructor';
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
        internalType: 'string';
        name: 'a';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'b';
        type: 'string';
      }
    ];
    name: 'compareStrings';
    outputs: [
      {
        internalType: 'bool';
        name: '';
        type: 'bool';
      }
    ];
    stateMutability: 'pure';
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
    name: 'getExtraMetadataAndUri';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'tokenURI';
            type: 'string';
          }
        ];
        internalType: 'struct AthleteLogic.TokenReturn';
        name: '';
        type: 'tuple';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'ownerAddr';
        type: 'address';
      },
      {
        internalType: 'string[]';
        name: 'positions';
        type: 'string[]';
      },
      {
        internalType: 'string';
        name: 'team';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'name';
        type: 'string';
      },
      {
        internalType: 'uint256[]';
        name: 'indexAndLimit';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256';
        name: 'supply';
        type: 'uint256';
      }
    ];
    name: 'getFilteredTokensForOwnerPagination';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'tokenURI';
            type: 'string';
          }
        ];
        internalType: 'struct AthleteLogic.TokenReturn[]';
        name: '';
        type: 'tuple[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'ownerAddr';
        type: 'address';
      },
      {
        internalType: 'string[]';
        name: 'positions';
        type: 'string[]';
      },
      {
        internalType: 'string';
        name: 'team';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'name';
        type: 'string';
      }
    ];
    name: 'getFilteredTokenSupplyForOwner';
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
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      }
    ];
    name: 'getTokenDataBatch';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'tokenURI';
            type: 'string';
          }
        ];
        internalType: 'struct AthleteLogic.TokenReturn[]';
        name: '';
        type: 'tuple[]';
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

export type PromoAthleteStorageABI = [
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
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'Paused';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
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
    name: 'TokenBurn';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'from';
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
        name: 'amounts';
        type: 'uint256[]';
      }
    ];
    name: 'TokenBurnBatch';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      }
    ];
    name: 'TokenTransfer';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'address';
        name: 'from';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'address';
        name: 'to';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      }
    ];
    name: 'TokenTransferBatch';
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
        internalType: 'uint256[]';
        name: 'tokens';
        type: 'uint256[]';
      }
    ];
    name: 'TokensMinted';
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
        internalType: 'address';
        name: 'account';
        type: 'address';
      }
    ];
    name: 'Unpaused';
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
        name: 'receiverAddr';
        type: 'address';
      },
      {
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'amount';
        type: 'uint256[]';
      }
    ];
    name: 'batchMintAthletes';
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
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'amount';
        type: 'uint256';
      }
    ];
    name: 'burnPromotionalToken';
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
        internalType: 'uint256';
        name: 'id';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'amount';
        type: 'uint256';
      }
    ];
    name: 'burnToken';
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
        internalType: 'uint256[]';
        name: 'ids';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'amounts';
        type: 'uint256[]';
      }
    ];
    name: 'burnTokenBatch';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    name: 'getAllAddresses';
    outputs: [
      {
        internalType: 'address[]';
        name: '';
        type: 'address[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'tokenOwner';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'getOwnerTokenIndex';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'index';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct PromotionalAthlete.IndexMapping';
        name: '';
        type: 'tuple';
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
    name: 'getTokenExtraMetadata';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'athleteId';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'symbol';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'name';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'team';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'position';
            type: 'string';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct PromotionalAthlete.TokenExtraMetadata';
        name: '';
        type: 'tuple';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'ownerAddr';
        type: 'address';
      }
    ];
    name: 'getTokenSupplyForOwner';
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
        name: 'ownerAddr';
        type: 'address';
      }
    ];
    name: 'getTokensForOwner';
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
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'nftTokenById';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            components: [
              {
                internalType: 'uint256';
                name: 'tokenId';
                type: 'uint256';
              },
              {
                internalType: 'string';
                name: 'athleteId';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'symbol';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'name';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'team';
                type: 'string';
              },
              {
                internalType: 'string';
                name: 'position';
                type: 'string';
              },
              {
                internalType: 'uint8';
                name: 'tokenType';
                type: 'uint8';
              },
              {
                internalType: 'uint256';
                name: 'restrictedUntil';
                type: 'uint256';
              },
              {
                internalType: 'bool';
                name: 'valid';
                type: 'bool';
              }
            ];
            internalType: 'struct PromotionalAthlete.TokenExtraMetadata';
            name: 'metadata';
            type: 'tuple';
          }
        ];
        internalType: 'struct PromotionalAthlete.TokenReturn';
        name: '';
        type: 'tuple';
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
    inputs: [];
    name: 'pause';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    name: 'paused';
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
        internalType: 'address';
        name: 'tokenOwner';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      }
    ];
    name: 'pushToOwnerTokenArray';
    outputs: [];
    stateMutability: 'nonpayable';
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
        name: 'tokenId';
        type: 'uint256';
      },
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'athleteId';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'symbol';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'name';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'team';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'position';
            type: 'string';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct PromotionalAthlete.TokenExtraMetadata';
        name: 'extra';
        type: 'tuple';
      }
    ];
    name: 'setTokenExtraMetadata';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'tokenId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'tokenURI';
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
    inputs: [];
    name: 'unpause';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_athleteLogicAddr';
        type: 'address';
      }
    ];
    name: 'updateAthleteLogicAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_gameAddr';
        type: 'address';
      }
    ];
    name: 'updateGameAddr';
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
        internalType: 'uint256';
        name: 'tokenId';
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

export type PromoAthleteLogicABI = [
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
        internalType: 'uint256[]';
        name: 'tokens';
        type: 'uint256[]';
      }
    ];
    name: 'TokensMinted';
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
        name: 'receiverAddr';
        type: 'address';
      },
      {
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'amount';
        type: 'uint256[]';
      },
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'athleteId';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'symbol';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'name';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'team';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'position';
            type: 'string';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct IAthlete.TokenExtraMetadata[]';
        name: 'extra';
        type: 'tuple[]';
      }
    ];
    name: 'sendTokensForMinting';
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
        name: 'tokenId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'tokenURI';
        type: 'string';
      }
    ];
    name: 'setAthleteTokenURI';
    outputs: [];
    stateMutability: 'nonpayable';
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
        name: '_athleteStorageAddr';
        type: 'address';
      }
    ];
    name: 'updateAthleteStorageAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_gameAddr';
        type: 'address';
      }
    ];
    name: 'updateGameAddr';
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
        name: 'ownerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256';
        name: 'expireTime';
        type: 'uint256';
      },
      {
        components: [
          {
            internalType: 'string[]';
            name: 'positions';
            type: 'string[]';
          },
          {
            internalType: 'uint8';
            name: 'amount';
            type: 'uint8';
          }
        ];
        internalType: 'struct PromotionalAthleteLogic.PositionsInfo[]';
        name: 'positions';
        type: 'tuple[]';
      }
    ];
    name: 'updateTokensRestriction';
    outputs: [
      {
        components: [
          {
            internalType: 'string[]';
            name: 'positions';
            type: 'string[]';
          },
          {
            internalType: 'uint8';
            name: 'amount';
            type: 'uint8';
          }
        ];
        internalType: 'struct PromotionalAthleteLogic.PositionsInfo[]';
        name: '';
        type: 'tuple[]';
      }
    ];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [];
    stateMutability: 'nonpayable';
    type: 'constructor';
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
        internalType: 'string';
        name: 'a';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'b';
        type: 'string';
      }
    ];
    name: 'compareStrings';
    outputs: [
      {
        internalType: 'bool';
        name: '';
        type: 'bool';
      }
    ];
    stateMutability: 'pure';
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
    name: 'getExtraMetadataAndUri';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'tokenURI';
            type: 'string';
          }
        ];
        internalType: 'struct PromotionalAthleteLogic.TokenReturn';
        name: '';
        type: 'tuple';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'ownerAddr';
        type: 'address';
      },
      {
        internalType: 'string[]';
        name: 'positions';
        type: 'string[]';
      },
      {
        internalType: 'string';
        name: 'team';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'name';
        type: 'string';
      },
      {
        internalType: 'uint256[]';
        name: 'indexAndLimit';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256';
        name: 'supply';
        type: 'uint256';
      }
    ];
    name: 'getFilteredTokensForOwnerPagination';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'tokenURI';
            type: 'string';
          }
        ];
        internalType: 'struct PromotionalAthleteLogic.TokenReturn[]';
        name: '';
        type: 'tuple[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'ownerAddr';
        type: 'address';
      },
      {
        internalType: 'string[]';
        name: 'positions';
        type: 'string[]';
      },
      {
        internalType: 'string';
        name: 'team';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'name';
        type: 'string';
      }
    ];
    name: 'getFilteredTokenSupplyForOwner';
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
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      }
    ];
    name: 'getTokenDataBatch';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'tokenId';
            type: 'uint256';
          },
          {
            internalType: 'uint8';
            name: 'tokenType';
            type: 'uint8';
          },
          {
            internalType: 'uint256';
            name: 'restrictedUntil';
            type: 'uint256';
          },
          {
            internalType: 'string';
            name: 'tokenURI';
            type: 'string';
          }
        ];
        internalType: 'struct PromotionalAthleteLogic.TokenReturn[]';
        name: '';
        type: 'tuple[]';
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
