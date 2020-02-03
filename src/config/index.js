const ENV = process.env.NODE_ENV || "development";
// const config = require(`./${ENV}.js`);
const config = {};
config.ENV = ENV;
// config.api_host = 'http://a439a8e2.ngrok.io';
// config.api_host = 'http://localhost:4000';
config.api_host = 'http://10.52.124.31';

module.exports = config;
