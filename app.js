const express = require("express");
const morgan = require("morgan");
const userRouter = require("./router/user");
require("express-async-errors");
require("dotenv").config();
require("./db");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || err });
});

app.listen(8000, () => {
  console.log("The port is listening on port 8000");
});
