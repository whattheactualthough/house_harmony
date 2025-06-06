const {
  selectAllTasksForGroup,
  selectTasksAssignedToUser,
  selectTotalPointsForUser,
  addTask,
  deleteTaskById,
  updateTaskStatus,
  selectTasksForRoom,
  selectTaskById,
} = require("../models/tasks.model");

exports.getTasks = (req, res, next) => {
  selectAllTasksForGroup("House Harmony Rd")
    .then((result) => res.status(200).send(result))
    .catch((err) => next(err));
};

exports.getTasksByUserId = (req, res, next) => {
  const { userId } = req.params;
  selectTasksAssignedToUser(userId)
    .then((result) => {
      if (!result.length) {
        return res.status(404).send({ msg: "No tasks found for user" });
      }
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(404).send({ msg: "No tasks found for user" });
    });
};

exports.getTasksByRoomId = (req, res, next) => {
  const { roomId } = req.params;
  selectTasksForRoom(roomId)
    .then((result) => res.status(200).send(result))
    .catch(() => res.status(200).send([]));
};

exports.postTask = (req, res, next) => {
  addTask(req.body)
    .then((taskArray) => res.status(201).send(taskArray[0]))
    .catch((err) => next(err));
};

exports.removeTaskById = (req, res, next) => {
  const { taskId } = req.params;
  deleteTaskById(taskId)
    .then(() => res.sendStatus(204))
    .catch(() => res.status(404).send({ msg: "Task not found" }));
};

exports.patchTaskStatus = (req, res, next) => {
  const { taskId } = req.params;
  const { status_id } = req.body;

  if (status_id === undefined) {
    return res.status(400).send({ msg: "Missing status_id in request body" });
  }

  selectTaskById(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({ msg: "Task not found" });
      }
      return updateTaskStatus(taskId, status_id)
        .then((updatedArray) => res.status(200).send(updatedArray[0]))
        .catch((err) => {
          if (err.code === "23503") {
            return res.status(400).send({ msg: "Invalid status_id" });
          }
          return next(err);
        });
    })
    .catch(() => {
      res.status(404).send({ msg: "Task not found" });
    });
};

exports.patchTask = (req, res) => {
  res.status(400).send({ msg: "Cannot update this field" });
};

exports.getPointsById = (req, res, next) => {
  const { userId } = req.params;
  selectTotalPointsForUser(userId)
    .then((points) =>
      res.status(200).send({ UserId: userId, "Total Points": points }),
    )
    .catch(() => res.status(200).send({ UserId: userId, "Total Points": 0 }));
};
