const express = require("express");
const {
  getApi,
  getUsers,
  getTasks,
} = require("./app/controllers/dummy_controller");
const app = express();

app.get("/api", getApi);
app.get("/api/tasks", getTasks);
app.get("/api/users", getUsers);

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Error Not Found" });
});
module.exports = app;
