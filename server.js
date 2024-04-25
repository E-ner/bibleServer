/**
 * Module dependencies
 */

const express = require("express");
const errorHandler = require("express-error-handler");
const helmet = require("helmet");
const logger = require("express-logger");
const dotenv = require("dotenv");
const serviceRouters = require("./routes/index");
const db = require("./models/index");
const { getKey } = require("./middlewares/getKey");
const packageJson = require("./package.json");

// Application configurations
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(logger({ path: "./log/log.txt" }));
app.use(errorHandler());
app.set("PORT", process.env.PORT || 4000);
app.use("/api/v1", getKey);
app.use((req, res, next) => {
  req.db = db;
  next();
});
for (let service of serviceRouters) {
  app.use("/api/v1", service);
}
app.route("/api/v1").get((req, res) => {
  res
    .status(200)
    .json({
      message: "Welcome to Bible Api",
      version: packageJson.version,
      documentation: {
        url: "nonde",
        description: "API documentation for the Bible Api",
      },
      status:"online"
    });
});
app
  .route("*")
  .all((req, res) =>
    res
      .status(400)
      .json({ msg: "End point not found", try: "/api/v1/book_list" })
  );

// Setting up the application startup
app.listen(app.get("PORT"), (_) => {
  console.log("Server started");
});
