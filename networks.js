const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider");

let secrets;

if (fs.existsSync("./secrets.json")) {
  secrets = JSON.parse(fs.readFileSync("secrets.json", "utf8"));
}

module.exports = {
  networks: {

    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },

    rinkeby: {
      events: {},
      provider: function () {
        return new HDWalletProvider([
          //  Deplyment account create in Truffle Console. Use only for ZOS deployments, not testing.
          //  Public Address: 0x87A07D2c2Bdfb082e1811f1945217962d078e494
          /*  Private Key */ secrets.rinkebyKey,
        ], 'https://rinkeby.infura.io/v3/b7922ee061c44d33a236a2b35210cae9', 0, 1)
      },
      network_id: 4,
      gas: 4612388
    }
  },
};                
