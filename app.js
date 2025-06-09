const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

const { getApi } = require("./app/controllers/api.controller");
const {
  getTasks,
  postTask,
  removeTaskbyId,
  patchTaskStatus,
  patchAssignedUser,
  getTasksByUserId,
  getTasksByRoomId,
} = require("./app/controllers/tasks.controller");
const { getRooms } = require("./app/controllers/rooms.controller");
const { getStatus } = require("./app/controllers/status.controller");
const {
  getAllUsers,
  getUserById,
} = require("./app/controllers/users.controller");
const {
  getAllImages,
  postImage,
} = require("./app/controllers/images.controller");
const {
  getTotalPointsByUserId,
} = require("./app/controllers/points.controller");

app.use(cors());
app.use(express.json());
const upload = multer();

// API docs
app.get("/api", getApi);

// Tasks
app.get("/api/tasks", getTasks);
app.post("/api/tasks", postTask);
app.delete("/api/tasks/:taskId", removeTaskbyId);
app.patch("/api/tasks/:taskId/status", patchTaskStatus);
app.patch("/api/tasks/:taskId", patchAssignedUser);
app.get("/api/tasks/:userId", getTasksByUserId);
app.get("/api/tasks/room/:roomId", getTasksByRoomId);

// Rooms & Status
app.get("/api/rooms", getRooms);
app.get("/api/status", getStatus);

// Users
app.get("/api/users", getAllUsers);
app.get("/api/users/:userId", getUserById);

// Points
app.get("/api/points/:userId", getTotalPointsByUserId);

// Images
app.get("/api/images", getAllImages);
app.post("/api/images", upload.single("image"), postImage);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ msg: "Error Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.msg || err.message || "Internal Server Error";
  res.status(status).json({ msg: message });
});

module.exports = app;
