const { createClient } = require("@supabase/supabase-js");
const { supabase_url, supabase_key } = require("../../db/connection");

exports.selectTasks = async() => {

    const supabase = createClient(supabase_url, supabase_key);
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      throw error;
    }
    return data;
 
}


