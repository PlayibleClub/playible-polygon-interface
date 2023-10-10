export type gameStorageABI = [
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'gameTimeStart';
        type: 'uint256';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'gameTimeEnd';
        type: 'uint256';
      }
    ];
    name: 'AddGame';
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
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      }
    ];
    name: 'RemoveGame';
    type: 'event';
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: false;
        internalType: 'string';
        name: 'result';
        type: 'string';
      },
      {
        indexed: false;
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        indexed: false;
        internalType: 'string';
        name: 'teamName';
        type: 'string';
      },
      {
        indexed: false;
        internalType: 'address';
        name: 'signer';
        type: 'address';
      },
      {
        indexed: false;
        internalType: 'uint256[]';
        name: 'lineup';
        type: 'uint256[]';
      }
    ];
    name: 'SucceedLineupSubmission';
    type: 'event';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameStartTime';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameEndTime';
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
        internalType: 'struct Game.PositionsInfo[]';
        name: 'positions';
        type: 'tuple[]';
      },
      {
        internalType: 'uint8';
        name: 'lineupLen';
        type: 'uint8';
      },
      {
        internalType: 'string';
        name: 'gameDescription';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'prizeDescription';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'gameImage';
        type: 'string';
      }
    ];
    name: 'addGame';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'playerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'teamName';
        type: 'string';
      },
      {
        internalType: 'uint256[]';
        name: 'lineup';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'apiIds';
        type: 'uint256[]';
      }
    ];
    name: 'addToGameJoinedTeamsList';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'playerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'teamName';
        type: 'string';
      },
      {
        internalType: 'uint256[]';
        name: 'lineup';
        type: 'uint256[]';
      }
    ];
    name: 'addToPlayerLineupBatch';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'playerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'teamName';
        type: 'string';
      }
    ];
    name: 'addToPlayerTeam';
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
        name: '_athleteAddr';
        type: 'address';
      }
    ];
    name: 'updateAthleteAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_athletePromoAddr';
        type: 'address';
      }
    ];
    name: 'updateAthletePromoAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameStartTime';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameEndTime';
        type: 'uint256';
      }
    ];
    name: 'updateGameDates';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_gameLogicAddr';
        type: 'address';
      }
    ];
    name: 'updateGameLogicAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'gameId';
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
        internalType: 'struct Game.PositionsInfo[]';
        name: 'positions';
        type: 'tuple[]';
      }
    ];
    name: 'updateGamePositionInfo';
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
        name: 'playerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'teamName';
        type: 'string';
      }
    ];
    name: 'checkTeamExists';
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
    name: 'getAllGameIds';
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
    name: 'getAllGamesInfo';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'gameId';
            type: 'uint256';
          },
          {
            internalType: 'address[]';
            name: 'whitelist';
            type: 'address[]';
          },
          {
            internalType: 'uint16';
            name: 'usageCost';
            type: 'uint16';
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
            internalType: 'struct Game.PositionsInfo[]';
            name: 'positions';
            type: 'tuple[]';
          },
          {
            internalType: 'uint8';
            name: 'lineupLen';
            type: 'uint8';
          },
          {
            internalType: 'uint64';
            name: 'joinedPlayerCounter';
            type: 'uint64';
          },
          {
            internalType: 'uint64';
            name: 'joinedTeamCounter';
            type: 'uint64';
          },
          {
            internalType: 'string';
            name: 'gameDescription';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'prizeDescription';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'gameImage';
            type: 'string';
          },
          {
            internalType: 'uint256';
            name: 'startTime';
            type: 'uint256';
          },
          {
            internalType: 'uint256';
            name: 'endTime';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Game.GameInfo[]';
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
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      }
    ];
    name: 'getGameInfo';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'gameId';
            type: 'uint256';
          },
          {
            internalType: 'address[]';
            name: 'whitelist';
            type: 'address[]';
          },
          {
            internalType: 'uint16';
            name: 'usageCost';
            type: 'uint16';
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
            internalType: 'struct Game.PositionsInfo[]';
            name: 'positions';
            type: 'tuple[]';
          },
          {
            internalType: 'uint8';
            name: 'lineupLen';
            type: 'uint8';
          },
          {
            internalType: 'uint64';
            name: 'joinedPlayerCounter';
            type: 'uint64';
          },
          {
            internalType: 'uint64';
            name: 'joinedTeamCounter';
            type: 'uint64';
          },
          {
            internalType: 'string';
            name: 'gameDescription';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'prizeDescription';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'gameImage';
            type: 'string';
          },
          {
            internalType: 'uint256';
            name: 'startTime';
            type: 'uint256';
          },
          {
            internalType: 'uint256';
            name: 'endTime';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Game.GameInfo';
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
        name: 'playerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'teamName';
        type: 'string';
      }
    ];
    name: 'getPlayerLineup';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256[]';
            name: 'lineup';
            type: 'uint256[]';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Game.PlayerLineupInfo';
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
        name: 'playerAddr';
        type: 'address';
      },
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      }
    ];
    name: 'getPlayerTeam';
    outputs: [
      {
        components: [
          {
            internalType: 'string[]';
            name: 'teamNames';
            type: 'string[]';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Game.PlayerTeamInfo';
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
        name: 'gameId';
        type: 'uint256';
      }
    ];
    name: 'getTeamsJoinedInGame';
    outputs: [
      {
        components: [
          {
            internalType: 'address';
            name: 'playerAddr';
            type: 'address';
          },
          {
            internalType: 'string';
            name: 'teamName';
            type: 'string';
          },
          {
            internalType: 'uint256[]';
            name: 'lineup';
            type: 'uint256[]';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct Game.GameTeams[]';
        name: '';
        type: 'tuple[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'getTotalGamesCounter';
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
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      }
    ];
    name: 'viewPlayerJoinedCounter';
    outputs: [
      {
        internalType: 'uint256';
        name: 'count';
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
        name: 'gameId';
        type: 'uint256';
      }
    ];
    name: 'viewPositions';
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
        internalType: 'struct Game.PositionsInfo[]';
        name: '';
        type: 'tuple[]';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  }
];

export type gameLogicABI = [
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
    inputs: [
      {
        internalType: 'address';
        name: 'accountAddr';
        type: 'address';
      }
    ];
    name: 'addAdmin';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameStartTime';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameEndTime';
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
        internalType: 'struct IGame.PositionsInfo[]';
        name: 'positions';
        type: 'tuple[]';
      },
      {
        internalType: 'uint8';
        name: 'lineupLen';
        type: 'uint8';
      },
      {
        internalType: 'string';
        name: 'gameDescription';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'prizeDescription';
        type: 'string';
      },
      {
        internalType: 'string';
        name: 'gameImage';
        type: 'string';
      }
    ];
    name: 'addGameToStorage';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: 'accountAddr';
        type: 'address';
      }
    ];
    name: 'deleteAdmin';
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
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'string';
        name: 'teamName';
        type: 'string';
      },
      {
        internalType: 'uint256[]';
        name: 'tokenIds';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'tokenPromoIds';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'lineup';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256[]';
        name: 'apiIds';
        type: 'uint256[]';
      },
      {
        internalType: 'uint256';
        name: 'currentTime';
        type: 'uint256';
      }
    ];
    name: 'submitLineup';
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
        name: '_athletePromoLogicAddr';
        type: 'address';
      }
    ];
    name: 'updateAthletePromoLogicAddr';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'gameId';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameStartTime';
        type: 'uint256';
      },
      {
        internalType: 'uint256';
        name: 'gameEndTime';
        type: 'uint256';
      }
    ];
    name: 'updateGameDatesOnStorage';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'uint256';
        name: 'gameId';
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
        internalType: 'struct IGame.PositionsInfo[]';
        name: 'positions';
        type: 'tuple[]';
      }
    ];
    name: 'updateGamePositionInfoOnStorage';
    outputs: [];
    stateMutability: 'nonpayable';
    type: 'function';
  },
  {
    inputs: [
      {
        internalType: 'address';
        name: '_gameStorageAddr';
        type: 'address';
      }
    ];
    name: 'updateGameStorageAddr';
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
        name: 'gameId';
        type: 'uint256';
      }
    ];
    name: 'getGameInfo';
    outputs: [
      {
        components: [
          {
            internalType: 'uint256';
            name: 'gameId';
            type: 'uint256';
          },
          {
            internalType: 'address[]';
            name: 'whitelist';
            type: 'address[]';
          },
          {
            internalType: 'uint16';
            name: 'usageCost';
            type: 'uint16';
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
            internalType: 'struct IGame.PositionsInfo[]';
            name: 'positions';
            type: 'tuple[]';
          },
          {
            internalType: 'uint8';
            name: 'lineupLen';
            type: 'uint8';
          },
          {
            internalType: 'uint64';
            name: 'joinedPlayerCounter';
            type: 'uint64';
          },
          {
            internalType: 'uint64';
            name: 'joinedTeamCounter';
            type: 'uint64';
          },
          {
            internalType: 'string';
            name: 'gameDescription';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'prizeDescription';
            type: 'string';
          },
          {
            internalType: 'string';
            name: 'gameImage';
            type: 'string';
          },
          {
            internalType: 'uint256';
            name: 'startTime';
            type: 'uint256';
          },
          {
            internalType: 'uint256';
            name: 'endTime';
            type: 'uint256';
          },
          {
            internalType: 'bool';
            name: 'valid';
            type: 'bool';
          }
        ];
        internalType: 'struct IGame.GameInfo';
        name: '';
        type: 'tuple';
      }
    ];
    stateMutability: 'view';
    type: 'function';
  },
  {
    inputs: [];
    name: 'getTotalGames';
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
  }
];
