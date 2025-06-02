const { getUsers } = require("../../db/getUsers");

exports.selectUsers = () => {
  return getUsers().then((data) => {
    return data;
  });
};
