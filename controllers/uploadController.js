let multer = require("multer");
let multerS3 = require("multer-s3");
let aws = require("aws-sdk");
let pool = require("../db");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

let s3 = new aws.S3(/*...*/);
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "blinggtask",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

exports.fileUploads = upload.fields([{ name: "banner" }]);

exports.handleFileUpload = async (req, res, next) => {
  try {
    let { name, description, loc, url } = req.body;
    let { location } = req.files.banner[0];
    let locationCol = await pool.query(
      `INSERT INTO location (location) values('${loc}') RETURNING *`
    );
    let bannerCol = await pool.query(
      `INSERT INTO banners (image,location_id) values('${location}',${locationCol.rows[0].id}) RETURNING *`
    );
    await pool.query(
      `INSERT INTO details (name,description,url,banner_id) values('${name}','${description}','${url}',${bannerCol.rows[0].id}) RETURNING *`
    );
    res.json({
      message: "req received",
    });
  } catch (err) {
    next(err);
  }
};
