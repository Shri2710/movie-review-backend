const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./router/user");
const { handleNotFound } = require("./utils/helper");
require("express-async-errors");
require("dotenv").config();
require("./db");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));





app.use("/api/user", userRouter);
app.use("/*",handleNotFound)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || err });
});

app.listen(8000, () => {
  console.log("The port is listening on port 8000");
});
