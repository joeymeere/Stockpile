export type Stockpile = {
  "version": "0.1.0",
  "name": "stockpile",
  "instructions": [
    {
      "name": "initFundraiser",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beneficiary",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fundraiserBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createFundraiser",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "beneficiary",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "imageLink",
          "type": "string"
        },
        {
          "name": "websiteLink",
          "type": "string"
        },
        {
          "name": "contactLink",
          "type": "string"
        },
        {
          "name": "fundraiserBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "contribute",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contributor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u8"
        }
      ]
    },
    {
      "name": "fundraiserWithdraw",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beneficiary",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u8"
        },
        {
          "name": "fundraiserBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "fundraiser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "beneficiary",
            "type": "publicKey"
          },
          {
            "name": "fundraiserConfig",
            "type": {
              "vec": {
                "defined": "FundraiserConfig"
              }
            }
          },
          {
            "name": "fundraiserBump",
            "type": "u8"
          },
          {
            "name": "raised",
            "type": "u8"
          },
          {
            "name": "withdrawReq",
            "type": {
              "vec": {
                "defined": "WithdrawOrder"
              }
            }
          },
          {
            "name": "contributionRec",
            "type": {
              "vec": {
                "defined": "ContributionRecieved"
              }
            }
          }
        ]
      }
    },
    {
      "name": "contributor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributor",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u8"
          },
          {
            "name": "contributorConfig",
            "type": {
              "vec": {
                "defined": "ContributorConfig"
              }
            }
          },
          {
            "name": "contributionCount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "fundraiserState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fundraiserConfig",
            "type": {
              "vec": {
                "defined": "FundraiserConfig"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "raised",
            "type": "u8"
          },
          {
            "name": "beneficiary",
            "type": "publicKey"
          },
          {
            "name": "withdrawReq",
            "type": {
              "vec": {
                "defined": "WithdrawOrder"
              }
            }
          },
          {
            "name": "contributionRec",
            "type": {
              "vec": {
                "defined": "ContributionRecieved"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "FundraiserConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageLink",
            "type": "string"
          },
          {
            "name": "websiteLink",
            "type": "string"
          },
          {
            "name": "contactLink",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ContributorConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributor",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "WithdrawOrder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "withdrawAmount",
            "type": "u8"
          },
          {
            "name": "beneficiary",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "ContributionRecieved",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributor",
            "type": "publicKey"
          },
          {
            "name": "fundraiser",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "IncorrectPDAPubkey",
      "msg": "The pubkey supplied is incorrect"
    },
    {
      "code": 6001,
      "name": "IncorrectBump",
      "msg": "The bump supplied is incorrect"
    },
    {
      "code": 6002,
      "name": "NameTooLong",
      "msg": "Fundraiser Name is too long"
    },
    {
      "code": 6003,
      "name": "DescriptionTooLong",
      "msg": "Description is too long"
    }
  ]
};

export const IDL: Stockpile = {
  "version": "0.1.0",
  "name": "stockpile",
  "instructions": [
    {
      "name": "initFundraiser",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beneficiary",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fundraiserBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createFundraiser",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "beneficiary",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "imageLink",
          "type": "string"
        },
        {
          "name": "websiteLink",
          "type": "string"
        },
        {
          "name": "contactLink",
          "type": "string"
        },
        {
          "name": "fundraiserBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "contribute",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contributor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u8"
        }
      ]
    },
    {
      "name": "fundraiserWithdraw",
      "accounts": [
        {
          "name": "fundraiser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "beneficiary",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u8"
        },
        {
          "name": "fundraiserBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "fundraiser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "beneficiary",
            "type": "publicKey"
          },
          {
            "name": "fundraiserConfig",
            "type": {
              "vec": {
                "defined": "FundraiserConfig"
              }
            }
          },
          {
            "name": "fundraiserBump",
            "type": "u8"
          },
          {
            "name": "raised",
            "type": "u8"
          },
          {
            "name": "withdrawReq",
            "type": {
              "vec": {
                "defined": "WithdrawOrder"
              }
            }
          },
          {
            "name": "contributionRec",
            "type": {
              "vec": {
                "defined": "ContributionRecieved"
              }
            }
          }
        ]
      }
    },
    {
      "name": "contributor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributor",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u8"
          },
          {
            "name": "contributorConfig",
            "type": {
              "vec": {
                "defined": "ContributorConfig"
              }
            }
          },
          {
            "name": "contributionCount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "fundraiserState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fundraiserConfig",
            "type": {
              "vec": {
                "defined": "FundraiserConfig"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "raised",
            "type": "u8"
          },
          {
            "name": "beneficiary",
            "type": "publicKey"
          },
          {
            "name": "withdrawReq",
            "type": {
              "vec": {
                "defined": "WithdrawOrder"
              }
            }
          },
          {
            "name": "contributionRec",
            "type": {
              "vec": {
                "defined": "ContributionRecieved"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "FundraiserConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageLink",
            "type": "string"
          },
          {
            "name": "websiteLink",
            "type": "string"
          },
          {
            "name": "contactLink",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "ContributorConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributor",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "WithdrawOrder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "withdrawAmount",
            "type": "u8"
          },
          {
            "name": "beneficiary",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "ContributionRecieved",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributor",
            "type": "publicKey"
          },
          {
            "name": "fundraiser",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "IncorrectPDAPubkey",
      "msg": "The pubkey supplied is incorrect"
    },
    {
      "code": 6001,
      "name": "IncorrectBump",
      "msg": "The bump supplied is incorrect"
    },
    {
      "code": 6002,
      "name": "NameTooLong",
      "msg": "Fundraiser Name is too long"
    },
    {
      "code": 6003,
      "name": "DescriptionTooLong",
      "msg": "Description is too long"
    }
  ]
};
