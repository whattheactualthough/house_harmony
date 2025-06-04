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
exports.selectTasksbyId = async(id) => {

    const supabase = createClient(supabase_url, supabase_key);
    const { data, error } = await supabase.from("tasks").select("*").eq("assigned_to_user_id", id);

    if(data.length === 0){
      return Promise.reject({status: 404, msg: "No tasks found for user"})
    }
    if (error) {
      throw error;
    }
    return data;
 
}

