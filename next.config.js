const fs = require('fs');
const withCSS = require('@zeit/next-css');

let secrets;

if (fs.existsSync("./secrets.json")) {
  secrets = JSON.parse(fs.readFileSync("secrets.json", "utf8"));
}
module.exports = withCSS({
  target: 'serverless',
  env: {
    PINATA_SECRET: secrets.pinataKey
  }
})
