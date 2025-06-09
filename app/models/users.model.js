const { supabase } = require("../../db/supabaseConfig");

exports.fetchAllUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("id, user_name, created_at");
  if (error) throw error;
  return data;
};

exports.fetchUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, user_name, created_at")
    .eq("id", userId)
    .single();
  // PGRST116 means “no rows returned”
  if (error && error.code !== "PGRST116") throw error;
  return data || null;
};
