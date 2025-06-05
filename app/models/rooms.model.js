const { createClient } = require("@supabase/supabase-js");
const { supabase_url, supabase_key } = require("../../db/connection")

exports.selectRooms = async () => {

  const supabase = createClient(supabase_url, supabase_key);
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
  const supabase = createClient(supabase_url, supabase_key);
  const { data, error } = await supabase
    .from('rooms')
    .insert(room);

  if (error) {
    throw error;
  }
  return data;
}

