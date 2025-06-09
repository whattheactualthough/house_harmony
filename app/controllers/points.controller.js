const { supabase } = require("../../db/supabaseConfig");

exports.getTotalPointsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("task_desirability_level(points)")
      .eq("assigned_to_user_id", userId)
      .eq("status_id", 4);
    if (error) throw error;
    const total = data.reduce(
      (sum, t) => sum + t.task_desirability_level.points,
      0,
    );
    res.status(200).json({ UserId: String(userId), "Total Points": total });
  } catch (err) {
    next(err);
  }
};
