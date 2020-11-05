let pool = require("../db");
let url = require("url");

exports.getLocation = async (req, res, next) => {
  try {
    let loc = req.query.location;
    console.log(loc);
    let response = await pool.query(
      `SELECT location FROM location JOIN banners ON location.id = banners.location_id WHERE location = '${loc}'`
    );
    res.json({
      data: response.rows,
    });
  } catch (err) {
    console.error(err);
  }
};
