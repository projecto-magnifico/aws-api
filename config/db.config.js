require('dotenv').config();

module.exports = {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  poolSize: 10,
  poolIdleTimeout: 10
}