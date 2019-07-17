const fs = require('fs');
const path = require('path');
const withCSS = require('@zeit/next-css');

let secrets;

if (fs.existsSync("./secrets.json")) {
  secrets = JSON.parse(fs.readFileSync("secrets.json", "utf8"));
}
module.exports = withCSS({
  webpack(config) {
    config.resolve.alias["scrypt.js"] = path.resolve(__dirname, "./node_modules/scrypt.js/js.js");
    return config
  },
  target: 'serverless',
  env: {
    PINATA_SECRET: secrets.pinataKey,
    CONTRACT_ADDRESS: "0x87a07d2c2bdfb082e1811f1945217962d078e494",
    ACTIVE_NETWORK: 4
  }
})
