// app/models/rooms.model.js
const { supabase } = require("../../db/supabaseConfig");

exports.selectRooms = async () => {
  const { data, error } = await supabase.from("rooms").select("*");
  if (error) throw error;
  return data;
};

exports.addRoom = async (room) => {
  if (!room.room_name) {
    const err = new Error("Missing room_name in request body");
    err.status = 400;
    throw err;
  }
  const { data, error } = await supabase
    .from("rooms")
    .insert([room])
    .select("*");
  if (error) throw error;
  return data[0];
};
