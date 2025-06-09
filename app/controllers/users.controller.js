const { fetchAllUsers, fetchUserById } = require("../models/users.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    const formatted = users.map((u) => ({
      id: u.id,
      user_name: u.user_name,
      created_at: u.created_at,
      email: u.email || "", // inject email field
    }));
    res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  if (!/^\d+$/.test(userId)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }
  try {
    const user = await fetchUserById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const formatted = {
      id: user.id,
      user_name: user.user_name,
      created_at: user.created_at,
      email: user.email || "", // inject email field
    };
    res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
};
