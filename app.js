const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

const { getUsers } = require("./app/controllers/users.controller");
const { getApi } = require("./app/controllers/api.controller");
const {
  getPointsbyId,
  getTasksByUserId,
  getTasks,
  postTask,
  removeTaskbyId,
  patchTaskStatus,
  patchAssignedUserId,
} = require("./app/controllers/tasks.controller");
const { getStatus } = require("./app/controllers/status.controller");
const { getRooms, postRoom } = require("./app/controllers/rooms.controller");
const {postImage} = require("./app/controllers/images.controller");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API docs
app.get("/api", getApi);

// Tasks
app.get("/api/tasks", getTasks);
app.post("/api/tasks", postTask);
app.delete("/api/tasks/:userId", removeTaskbyId);
app.patch("/api/tasks/:taskId/status", patchTaskStatus);
app.patch("/api/tasks/:taskId", patchAssignedUserId)

// Users & Points
app.get("/api/users", getUsers);
app.get("/api/tasks/:userId", getTasksByUserId);
app.get("/api/points/:userId", getPointsbyId);

// Status
app.get("/api/status", getStatus);

// Rooms
app.get("/api/rooms", getRooms);
app.post("/api/rooms", postRoom);

//post image
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post("/api/images", upload.single("image"), postImage)



// Error handler
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

// 404 handler for all other routes (THIS IS THE RIGHT WAY)
app.use((req, res) => {
  res.status(404).send({ msg: "Error Not Found" });
});

module.exports = app;
