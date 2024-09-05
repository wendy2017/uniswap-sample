require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        // url: "https://eth-mainnet.alchemyapi.io/v2/3fRVx_9nvNRaNnYL_OOUID7WPhx1N9jc",
        url: "https://eth-mainnet.g.alchemy.com/v2/HipkY4uUcIiBDv1bjvrgdKZgzj2A_3R3",
        // accounts: [
        //   `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`,
        // ],
      },
    },
  },
  // networks: {
  //   hardhat: {
  //     chainId: 31337,
  //   },
  //   localhost: {
  //     chainId: 31337,
  //     url: "http://127.0.0.1:8545",
  //   },
  // },
  // networks: {
  //   hardhat: {
  //     forking: {
  //       url: "https://mainnet.infura.io/v3/42237fbfbd2a472c88e935a4bfac5aac",
  //     },
  //   },
  //   sepolia: {
  //     url: "https://sepolia.infura.io/v3/b40c4ca6a7c2468a9bf2b51fba999cf9",
  //     accounts: [privateKey1],
  //   },
  // },
  paths: {
    tests: "./test",
  },
};
