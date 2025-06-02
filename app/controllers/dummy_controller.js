const endpoints = require("../../endpoints.json");
const { selectTasks } = require("../models/dummy_model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints });
};
exports.getTasks = (req, res) => {
  return selectTasks().then((result) => {
    res.status(200).send(result);
  });
};
