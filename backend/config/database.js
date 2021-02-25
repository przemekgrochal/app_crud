//INIT ENVIRONMENT VARS
// require("dotenv").config();

// const {
//   DB_HOST,
//   DB_NAME,
//   DB_DRIVER,
//   DB_USER,
//   DB_PASSWORD,
//   NODE_ENV
// } = process.env;

// const env = NODE_ENV || "development";

// const defaultConfig = {
//   host: DB_HOST,
//   database: DB_NAME,
//   username: DB_USER,
//   password: DB_PASSWORD,
//   dialect: DB_DRIVER, //default is 'mysql'
//   dialectOptions: {
//     dateStrings: true,
//     typeCast: (field, next) => {
//       if (field.type === "DATETIME") return field.string();
//       return next();
//     }
//   },
//   timezone: "-03:00"
// };

// console.log(defaultConfig);
/* UNCOMMENT THIS BLOCK CODE TO IMPLEMENTS MIGRATIONS and SEEDS */
// /*
// const storageConfig = {
//   migrationStorage: "json",
//   migrationStoragePath: "./database/migration-metadata.json",
//   seederStorage: "json",
//   seederStoragePath: "./database/seeder-metadata.json"
// };

// module.exports = {
//   [env]: { ...defaultConfig, ...storageConfig }
// };
// */

/* REMOVE THIS CODE TO IMPLEMENTS MIGRATIONS and SEEDS */
// exports.config = {
//   [env]: defaultConfig
// };

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Qt7JNCcN',
  database : 'db_crud'
});
 
connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

connection.query('SELECT * FROM db_crud.user', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();
