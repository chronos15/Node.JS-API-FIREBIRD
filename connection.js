const Firebird = require("node-firebird");

const connectionOptions = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DBSOURCE,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
};

const getConnection = () => {
  return Firebird.pool(5, connectionOptions);
};

module.exports = { getConnection };
