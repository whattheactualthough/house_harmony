const express = require("express");
const { getApi } = require("./app/controllers/dummy_controller");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/api", getApi);

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Error Not Found" });
});
module.exports = app;
