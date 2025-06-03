const {selectTasks}= require("../models/tasks.model");

exports.getTasks = (req, res, next) => {
  return selectTasks().then((result) => {
    res.status(200).send(result);
  }).catch((err)=>next(err));
};