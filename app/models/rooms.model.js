
const { supabase } = require("../../db/supabaseConfig")

exports.selectRooms = async () => {

  const { data, error } = await supabase
    .from('rooms')
    .select('*');

  if (error) {
    throw error;
  }
  return data;

}

//addRoom function to add a room to the rooms table
exports.addRoom = async (room) => {
 
  const { data, error } = await supabase
    .from('rooms')
    .insert(room);

  if (error) {
    throw error;
  }
  return data;
}

