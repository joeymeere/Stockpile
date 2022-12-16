export type Stockpile = {
  version: "0.1.0";
  name: "stockpile";
  instructions: [
    {
      name: "createUser";
      accounts: [
        { name: "userAccount"; isMut: true; isSigner: false },
        { name: "authority"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "username"; type: "string" }];
    },
    {
      name: "updateUser";
      accounts: [
        { name: "userAccount"; isMut: true; isSigner: false },
        { name: "authority"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "username"; type: "string" }];
    },
    {
      name: "createFundraiser";
      accounts: [
        { name: "fundraiser"; isMut: true; isSigner: false },
        { name: "userAccount"; isMut: true; isSigner: false },
        { name: "beneficiary"; isMut: true; isSigner: true },
        { name: "rent"; isMut: false; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "name"; type: "string" },
        { name: "description"; type: "string" },
        { name: "imageLink"; type: "string" },
        { name: "websiteLink"; type: "string" },
        { name: "contactLink"; type: "string" },
        { name: "goal"; type: "string" }
      ];
    },
    {
      name: "contribute";
      accounts: [
        { name: "fundraiser"; isMut: true; isSigner: false },
        { name: "contributor"; isMut: true; isSigner: true },
        { name: "userAccount"; isMut: true; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "amount"; type: "f64" }];
    },
    {
      name: "fundraiserWithdraw";
      accounts: [
        { name: "fundraiser"; isMut: true; isSigner: false },
        { name: "userAccount"; isMut: true; isSigner: false },
        { name: "beneficiary"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "amount"; type: "f64" }];
    }
  ];
  accounts: [
    {
      name: "User";
      type: {
        kind: "struct";
        fields: [
          { name: "authority"; type: "publicKey" },
          { name: "username"; type: "string" },
          { name: "fundraisers"; type: "u8" },
          { name: "contributions"; type: "u8" },
          { name: "bump"; type: "u8" }
        ];
      };
    },
    {
      name: "Fundraiser";
      type: {
        kind: "struct";
        fields: [
          { name: "beneficiary"; type: "publicKey" },
          { name: "creator"; type: "string" },
          { name: "name"; type: "string" },
          { name: "description"; type: "string" },
          { name: "imageLink"; type: "string" },
          { name: "contactLink"; type: "string" },
          { name: "websiteLink"; type: "string" },
          { name: "raised"; type: "u64" },
          { name: "goal"; type: "string" },
          { name: "contributions"; type: "u8" },
          { name: "bump"; type: "u8" }
        ];
      };
    },
    {
      name: "Contributor";
      type: {
        kind: "struct";
        fields: [
          { name: "contributor"; type: "publicKey" },
          { name: "username"; type: "string" },
          { name: "amount"; type: "f64" }
        ];
      };
    },
    {
      name: "Beneficiary";
      type: {
        kind: "struct";
        fields: [
          { name: "username"; type: "string" },
          { name: "amount"; type: "u64" }
        ];
      };
    }
  ];
  errors: [
    { code: 6000; name: "NameTooLong"; msg: "Fundraiser Name is too long" },
    { code: 6001; name: "DescriptionTooLong"; msg: "Description is too long" },
    {
      code: 6002;
      name: "AmountTooLarge";
      msg: "Attempting to withdraw more than Fundraiser's balance";
    },
    {
      code: 6003;
      name: "GoalNotMet";
      msg: "Fundraiser's goal has not been met";
    },
    {
      code: 6004;
      name: "InvalidBeneficiary";
      msg: "Invalid Beneficiary provided";
    }
  ];
};
export const IDL: Stockpile = {
  version: "0.1.0",
  name: "stockpile",
  instructions: [
    {
      name: "createUser",
      accounts: [
        { name: "userAccount", isMut: true, isSigner: false },
        { name: "authority", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "username", type: "string" }],
    },
    {
      name: "updateUser",
      accounts: [
        { name: "userAccount", isMut: true, isSigner: false },
        { name: "authority", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "username", type: "string" }],
    },
    {
      name: "createFundraiser",
      accounts: [
        { name: "fundraiser", isMut: true, isSigner: false },
        { name: "userAccount", isMut: true, isSigner: false },
        { name: "beneficiary", isMut: true, isSigner: true },
        { name: "rent", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "imageLink", type: "string" },
        { name: "websiteLink", type: "string" },
        { name: "contactLink", type: "string" },
        { name: "goal", type: "string" },
      ],
    },
    {
      name: "contribute",
      accounts: [
        { name: "fundraiser", isMut: true, isSigner: false },
        { name: "contributor", isMut: true, isSigner: true },
        { name: "userAccount", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "amount", type: "f64" }],
    },
    {
      name: "fundraiserWithdraw",
      accounts: [
        { name: "fundraiser", isMut: true, isSigner: false },
        { name: "userAccount", isMut: true, isSigner: false },
        { name: "beneficiary", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "amount", type: "f64" }],
    },
  ],
  accounts: [
    {
      name: "User",
      type: {
        kind: "struct",
        fields: [
          { name: "authority", type: "publicKey" },
          { name: "username", type: "string" },
          { name: "fundraisers", type: "u8" },
          { name: "contributions", type: "u8" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "Fundraiser",
      type: {
        kind: "struct",
        fields: [
          { name: "beneficiary", type: "publicKey" },
          { name: "creator", type: "string" },
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "imageLink", type: "string" },
          { name: "contactLink", type: "string" },
          { name: "websiteLink", type: "string" },
          { name: "raised", type: "u64" },
          { name: "goal", type: "string" },
          { name: "contributions", type: "u8" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "Contributor",
      type: {
        kind: "struct",
        fields: [
          { name: "contributor", type: "publicKey" },
          { name: "username", type: "string" },
          { name: "amount", type: "f64" },
        ],
      },
    },
    {
      name: "Beneficiary",
      type: {
        kind: "struct",
        fields: [
          { name: "username", type: "string" },
          { name: "amount", type: "u64" },
        ],
      },
    },
  ],
  errors: [
    { code: 6000, name: "NameTooLong", msg: "Fundraiser Name is too long" },
    { code: 6001, name: "DescriptionTooLong", msg: "Description is too long" },
    {
      code: 6002,
      name: "AmountTooLarge",
      msg: "Attempting to withdraw more than Fundraiser's balance",
    },
    {
      code: 6003,
      name: "GoalNotMet",
      msg: "Fundraiser's goal has not been met",
    },
    {
      code: 6004,
      name: "InvalidBeneficiary",
      msg: "Invalid Beneficiary provided",
    },
  ],
};
