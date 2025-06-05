
const { selectAllTasksForGroup, selectTotalPointsForUser, selectTasksAssignedToUser, addTask}= require("../models/tasks.model");



exports.getTasks = (req, res, next) => {
  return selectAllTasksForGroup("House Harmony Rd").then((result) => {
    res.status(200).send(result);
  }).catch((err)=>next(err));
};
exports.getTasksByUserId = (req, res, next) => {
  const {userId} = req.params
  return selectTasksAssignedToUser(userId).then((result)=>{
    if(result.length===0){
      res.status(404).send({msg: "No tasks found for user"})
    }
    res.status(200).send(result)
  })

 
}
exports.getPointsbyId = (req, res, next)=>{
  const {userId} = req.params
  return selectTotalPointsForUser(userId).then((points)=>{
    res.status(200).send({"UserId": userId, "Total Points": points})
  })
}
exports.postTask = (req, res, next) => {
  const body = req.body
  return addTask(body).then((task)=>{
    res.status(201).send(task)
  })
}
exports.removeTaskbyId = (req, res, next) => {
  const {userId} = req.params
  return deleteTaskById.then((data)=>{
    res.status(204).send(data)
  })
}
