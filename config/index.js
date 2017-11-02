process.env.NODE_ENV = process.env.NODE_ENV || 'db.config';
console.log(process.env.NODE_ENV);
module.exports = require(`./${process.env.NODE_ENV}.js`);