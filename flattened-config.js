// In order to load environment variables (e.g. API keys)
module.exports = {
  contracts_directory: process.env.FLATTENED_DIRECTORY,
  migrations_directory: process.env.FLATTENED_DIRECTORY,
  networks: {
    test: {
      provider: require("ganache-cli").provider({ gasLimit: 100000000, seed: 1234 }),
      network_id: "*",
    },
    development: {
      provider: require("ganache-cli").provider({ gasLimit: 100000000, seed: 1234 }),
      network_id: "*",
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port: 8543,
      gasPrice: 1e9
    },
    rinkeby: {
      network_id: 4,
      host: "localhost",
      port: 8544,
      gasPrice: 10e9
    },
    goerli: {
      network_id: 5,
      host: "localhost",
      port: 8545,
      gasPrice: 1e9
    },
    kovan: {
      network_id: 42,
      host: "localhost",
      port: 8542,
      gasPrice: 1e9
    },
    mainnet: {
      network_id: 1,
      host: "localhost",
      port: 9545,
      gasPrice: 20000000000, // 20 gwei
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
       version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
       settings: { // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  plugins: [
    "truffle-plugin-verify",
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
}
