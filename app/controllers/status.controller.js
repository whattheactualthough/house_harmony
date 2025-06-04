const {selectStatus}= require("../models/status.model");

exports.getStatus = (req, res, next) => {
  return selectStatus().then((result) => {
    res.status(200).send(result);
  }).catch((err)=>next(err));
  
};