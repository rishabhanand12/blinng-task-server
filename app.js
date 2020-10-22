const express = require("express");
// const { client } = require("pg");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");
const pool = require("./db");
const bannerRouter = require("./routes/banner");
let PORT = process.env.PORT || 5000;
require("dotenv").config();

//creating express server
var app = express();

pool.connect((err, client, done) => {
  if (err) console.log(err);
  //   console.log(client);
  console.log("working");
});

app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route handlers
app.use("/api/banner", bannerRouter);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, _req, res, _next) {
  console.log("in error handler");
  // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    error: err,
  });
  //   if (process.env.NODE_ENV === "developemnt") {
  //     res.json({
  //       error: err,
  //     });
  //   }
});

app.listen(PORT, () => console.log("server running"));
