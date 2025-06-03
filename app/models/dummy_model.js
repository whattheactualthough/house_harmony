const { getUsers } = require("../../db/getUsers");
const { getTasks } = require("../../db//getTasks");
const { getStatus } = require("../../db/getStatus");
const { getRooms } = require("../../db/getRooms");

exports.selectTasks = () => {
  return getTasks().then((data) => {
    return data;
  });
};
exports.selectUsers = () => {
  return getUsers().then((data) => {
    return data;
  });
};
exports.selectStatus = () => {
  return getStatus().then((data) => {
    return data;
  });
};
exports.selectRooms = () => {
  return getRooms().then((data) => {
    return data;
  });
};
