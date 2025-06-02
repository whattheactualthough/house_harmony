const endpoints = require("../../endpoints.json");
const { selectTasks, selectUsers } = require("../models/dummy_model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints });
};
exports.getUsers = (req, res) => {
  return selectUsers().then((result) => {
    res.status(200).send(result);
  });
};
