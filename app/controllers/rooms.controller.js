// app/controllers/rooms.controller.js
const { selectRooms, addRoom } = require("../models/rooms.model");

exports.getRooms = (req, res, next) => {
  selectRooms()
    .then((rooms) => res.status(200).send(rooms))
    .catch(next);
};

exports.postRoom = (req, res, next) => {
  addRoom(req.body)
    .then((room) => res.status(201).send(room))
    .catch((err) => {
      if (err.status === 400) {
        res.status(400).send({ msg: err.message });
      } else {
        next(err);
      }
    });
};
