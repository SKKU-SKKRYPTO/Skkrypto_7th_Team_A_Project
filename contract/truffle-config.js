const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const NETWORK_ID = '1001'
const GASLIMIT = '20000000'
const URL = `https://api.baobab.klaytn.net:8651`
const PRIVATE_KEY = '0xb49458083fbe40c2b0f91f413236e9261e8c6d978701e88a78598be7a773c28c'

module.exports = {
  networks: {  
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id 
    },

    klaytn: {
      provider: new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    }  
  }
}