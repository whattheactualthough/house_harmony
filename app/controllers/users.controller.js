const {selectUsers}= require("../models/users.model");

exports.getUsers = (req, res, next) => {
  return selectUsers().then((result) => {
    res.status(200).send(result)
  }).catch((err)=>next(err));
  
}
