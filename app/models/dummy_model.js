const { getUsers } = require("../../db/getUsers");
const { getTasks } = require("../../db//getTasks");

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
