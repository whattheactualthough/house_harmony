const { supabase } = require("../../db/supabaseConfig");

exports.getAllImages = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("images")
      .select("id, image_url, created_at, task_id, user_id");

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.postImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No image file provided" });
    }

    const { originalname, buffer, mimetype } = req.file;
    // Adjust bucket name "images" if different in your Supabase project
    const { data, error } = await supabase.storage
      .from("images")
      .upload(originalname, buffer, { contentType: mimetype });

    if (error) throw error;

    // Construct a public URL (adjust based on your storage settings)
    const publicUrl = supabase.storage.from("images").getPublicUrl(data.path)
      .data.publicUrl;

    res.status(201).json({
      id: data.id || null,
      path: data.path,
      publicUrl,
    });
  } catch (err) {
    next(err);
  }
};
