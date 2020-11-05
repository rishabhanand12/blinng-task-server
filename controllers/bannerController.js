let pool = require("../db");

exports.getBanners = async (req, res, next) => {
  try {
    let response = await pool.query(
      "SELECT * FROM banners JOIN details ON banners.id = details.banner_id "
    );
    res.json({
      data: response.rows,
    });
  } catch (err) {
    next(err);
  }
};
