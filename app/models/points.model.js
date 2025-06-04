const { createClient } = require("@supabase/supabase-js");
const { supabase_url, supabase_key } = require("../../db/connection");
const supabase = createClient(supabase_url, supabase_key);

const selectPointsById = async(id)=>{
    const { data, error } = await supabase.from("task_desirability_level").select("*").eq("id", id);
    if (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
    return data;
}
module.exports = {selectPointsById}