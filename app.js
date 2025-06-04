const express = require("express");
const { getUsers } = require("./app/controllers/users.controller");
const { getApi } = require("./app/controllers/api.controller");
const {getTasks} = require("./app/controllers/tasks.controller");
const { getStatus } = require("./app/controllers/status.controller");
const { getRooms } = require("./app/controllers/rooms.controller");
const app = express();

app.get("/api", getApi);
app.get("/api/tasks", getTasks);
app.get("/api/users", getUsers);
app.get("/api/status", getStatus);
app.get("/api/rooms", getRooms);

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Error Not Found" });
});
module.exports = app;
