const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password@12",
  host: "localhost",
  port: "5432",
  database: "blingg-task",
});

// pool.query(
//   "CREATE TABLE Banners (id SERIAL PRIMARY KEY, image TEXT,location_id INT)",
//   (err, res) => {
//     if (err) console.error(err);
//     console.log(res);
//     pool.query(
//       "CREATE TABLE Details (id SERIAL PRIMARY KEY, name VARCHAR(25),description TEXT,URL TEXT, banner_id INT)",
//       (err, res) => {
//         if (err) console.error(err);
//         console.log(res);
//         pool.query(
//           "CREATE TABLE Location (id SERIAL PRIMARY KEY, location VARCHAR(15))",
//           (err, res) => {
//             if (err) console.error(err);
//             console.log(res);
//             pool.end();
//           }
//         );
//       }
//     );
//   }
// );

// let queries = [
//   "CREATE TABLE Banners (id INT, image TEXT,location_id INT)",
//   "CREATE TABLE Details (id INT, name VARCHAR(25),description TEXT,URL TEXT, banner_id INT)",
//   "CREATE TABLE Location (id INT, location VARCHAR(15))",
// ];

module.exports = pool;
