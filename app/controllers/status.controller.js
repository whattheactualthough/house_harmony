const { supabase } = require("../../db/supabaseConfig");

exports.getStatus = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("status").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
