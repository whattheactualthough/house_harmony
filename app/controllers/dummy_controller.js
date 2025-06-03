const endpoints = require("../../endpoints.json");
const {
  selectTasks,
  selectUsers,
  selectStatus,
  selectRooms,
} = require("../models/dummy_model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints });
};
exports.getTasks = (req, res) => {
  return selectTasks().then((result) => {
    res.status(200).send(result);
  });
};
exports.getUsers = (req, res) => {
  return selectUsers().then((result) => {
    res.status(200).send(result);
  });
};
exports.getStatus = (req, res) => {
  return selectStatus().then((result) => {
    res.status(200).send(result);
  });
};
exports.getRooms = (req, res) => {
  return selectRooms().then((result) => {
    res.status(200).send(result);
  });
};
