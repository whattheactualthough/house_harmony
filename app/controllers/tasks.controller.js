const {
  selectAllTasksForGroup,
  selectTotalPointsForUser,
  selectTasksAssignedToUser,
  addTask,
  deleteTaskById,
  updateTaskStatus,
} = require("../models/tasks.model.js");

// GET all tasks
exports.getTasks = (req, res, next) => {
  return selectAllTasksForGroup("House Harmony Rd")
    .then((result) => res.status(200).send(result))
    .catch(next);
};

// GET tasks for a user
exports.getTasksByUserId = (req, res, next) => {
  const { userId } = req.params;
  return selectTasksAssignedToUser(userId)
    .then((result) => {
      if (result.length === 0) {
        res.status(404).send({ msg: "No tasks found for user" });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(next);
};

// GET total points for user
exports.getPointsbyId = (req, res, next) => {
  const { userId } = req.params;
  return selectTotalPointsForUser(userId)
    .then((points) =>
      res.status(200).send({ UserId: userId, "Total Points": points }),
    )
    .catch(next);
};

// POST new task
exports.postTask = (req, res, next) => {
  const body = req.body;
  return addTask(body)
    .then((task) => res.status(201).send(task))
    .catch(next);
};

// DELETE task by user ID
exports.removeTaskbyId = (req, res, next) => {
  const { userId } = req.params;
  return deleteTaskById(userId)
    .then((data) => res.status(204).send(data))
    .catch(next);
};

// PATCH status of a task
exports.patchTaskStatus = (req, res, next) => {
  const { taskId } = req.params;
  const { status_id } = req.body;

  if (!status_id) {
    return res.status(400).json({ msg: "Missing status_id in request body" });
  }

  updateTaskStatus(taskId, status_id)
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).json({ msg: "Task not found" });
      }
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      if (err.code === "23503") {
        // foreign key constraint violation
        return res.status(400).json({ msg: "Invalid status_id" });
      }
      next(err);
    });
};
