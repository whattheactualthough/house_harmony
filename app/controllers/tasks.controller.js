const {
  selectAllTasksForGroup,
  selectTasksAssignedToUser,
  selectTotalPointsForUser,
  addTask,
  deleteTaskById,
  updateTaskStatus,

  updateAssignedUser,
  selectTaskById,


} = require("../models/tasks.model");


// GET all tasks
exports.getTasks = (req, res, next) => {
  selectAllTasksForGroup("House Harmony Rd")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};

// GET tasks by userId
exports.getTasksByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    // Early reject for out-of-range IDs for SMALLINT
    if (isNaN(userId) || Number(userId) > 32767) {
      return res.status(404).send({ msg: "No tasks found for user" });
    }
    const result = await selectTasksAssignedToUser(userId);
    if (!result || result.length === 0) {
      return res.status(404).send({ msg: "No tasks found for user" });
    }
    res.status(200).send(result);
  } catch (err) {
    if (err && err.code === "22003") {
      // PostgreSQL numeric out-of-range error
      return res.status(404).send({ msg: "No tasks found for user" });
    }
    next(err);
  }
};

// GET total points by userId
exports.getPointsbyId = (req, res, next) => {
  const { userId } = req.params;
  selectTotalPointsForUser(userId)
    .then((points) => {
      res.status(200).send({ UserId: userId, "Total Points": points });
    })
    .catch(next);
};

// POST a new task
exports.postTask = (req, res, next) => {
  const body = req.body;
  addTask(body)
    .then((task) => {
      res.status(201).send(task);
    })
    .catch(next);
};

// DELETE a task by userId (should be by taskId, but keeping as your original)
exports.removeTaskbyId = (req, res, next) => {
  const { userId } = req.params;
  deleteTaskById(userId)
    .then((data) => {
      res.status(204).send(data);
    })
    .catch(next);
};

// PATCH task status
exports.patchTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { status_id } = req.body;
  if (!status_id) {
    return res.status(400).send({ msg: "Missing status_id in request body" });
  }
  try {
    // Attempt update
    const result = await updateTaskStatus(taskId, status_id);
    if (!result || result.length === 0) {
      return res.status(404).send({ msg: "Task not found" });
    }
    // Handle Postgres FK errors (invalid status_id)
    if (result[0].status_id !== status_id) {
      return res.status(400).send({ msg: "Invalid status_id" });
    }
    res.status(200).send(result[0]);
  } catch (err) {
    if (err && err.code === "23503") {
      // Foreign key constraint (invalid status_id)
      return res.status(400).send({ msg: "Invalid status_id" });
    }
    next(err);
  }
};
exports.patchAssignedUserId = (req, res, next) => {
  const {taskId} = req.params
  const {assigned_to_user_id} = req.body
  return updateAssignedUser(taskId, assigned_to_user_id).then(()=>{
    return selectTaskById(taskId).then((data)=>{
      res.status(400).send({data})
    })
  })
}