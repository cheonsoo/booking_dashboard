const ENV = process.env.NODE_ENV || "development";
// const config = require(`./${ENV}.js`);
const config = {};
config.ENV = ENV;
config.api_host = 'http://a439a8e2.ngrok.io';
module.exports = config;
