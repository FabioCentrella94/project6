require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

const app = express();

app.use(helmet());

mongoose
  .connect(process.env.MONGO_DB_ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://project6.myportfolio.training"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

app.get("/", function (req, res) {
  res.json({
    status: 200,
    message: "Server is running",
  });
});

app.get("/favicon.ico", (req, res) => res.status(204));

module.exports = app;