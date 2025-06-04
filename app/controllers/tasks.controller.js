const { selectPointsById } = require("../models/points.model");
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
exports.getPointsByUserId = (req, res, next) => {
  const {userId} = req.params
  let totalPoints = 0
  return selectTasksbyId(userId).then((result)=>{
    console.log(result)
    result.forEach((task)=>{
      if(task.status_id===4){
        return selectPointsById(task.task_desirability_level_id)
        .then((result)=>{
          totalPoints += result[0].points
        }).Promise.all(task).then(()=>(console.log(totalPoints)))
      }
    })
  })
}