require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_TESTNET_RPC_URL,
      accounts: [process.env.TEST_PRIVATE_KEY],
    },
  },
};
