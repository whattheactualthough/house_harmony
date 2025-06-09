const { supabase } = require("../../db/supabaseConfig");

exports.getRooms = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("rooms").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
