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

