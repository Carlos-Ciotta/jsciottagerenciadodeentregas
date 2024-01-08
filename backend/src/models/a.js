const mysql = require("mysql");

var connection = mysql.createPool({
  host: "viaduct.proxy.rlwy.net",
  user: "root",
  password:"c1eH6deEAg12f3aHCAGFegb15162ddGg" ,
  database: "railway"
});

module.exports = connection;