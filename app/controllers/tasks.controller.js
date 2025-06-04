const {selectTasks, selectTasksbyId}= require("../models/tasks.model");

exports.getTasks = (req, res, next) => {
  return selectTasks().then((result) => {
    res.status(200).send(result);
  }).catch((err)=>next(err));
};
exports.getTasksByUserId = (req, res, next) => {
  const {userId} = req.params
  return selectTasksbyId(userId).then((result)=>{
    res.status(200).send(result)
  })
  
}