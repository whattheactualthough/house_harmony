const {selectRooms} = require("../models/rooms.model");
exports.getRooms = (req, res, next) => {
  return selectRooms().then((result) => {
    res.status(200).send(result);
  }
  ).catch((err) => next(err));
}