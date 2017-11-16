const pgp = require('pg-promise')({promiseLib: Promise}); 
const config = require('./config/'); 
const db = pgp(config);

module.exports = db;