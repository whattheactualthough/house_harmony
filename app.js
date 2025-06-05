const express = require("express");
const { getUsers } = require("./app/controllers/users.controller");
const { getApi } = require("./app/controllers/api.controller");

const {getPointsbyId, getTasksByUserId, getTasks, postTask, removeTaskbyId} = require("./app/controllers/tasks.controller");


const { getStatus } = require("./app/controllers/status.controller");
const { getRooms } = require("./app/controllers/rooms.controller");
const app = express();
app.use(express.json())
app.get("/api", getApi);
app.get("/api/tasks", getTasks);
app.get("/api/users", getUsers);
app.get("/api/status", getStatus);
app.get("/api/rooms", getRooms);
app.get("/api/tasks/:userId", getTasksByUserId)
app.get("/api/points/:userId", getPointsbyId)
app.post("/api/tasks", postTask)
app.delete("api/tasks/:userId", removeTaskbyId)


app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Error Not Found" });
});
module.exports = app;
