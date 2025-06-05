
const { supabase } = require("../../db/supabaseConfig");


const selectPointsById = async (id) => {
    const { data, error } = await supabase.from("task_desirability_level").select("*").eq("id", id);
    if (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
    return data;
}
module.exports = { selectPointsById }