const { uploadImage } = require("../models/images.model");


exports.postImage =  (req, res, next) => {

    const file = req.file; // Assuming you're using multer for file uploads
    if (!file) {
        return res.status(400).send({ msg: "No file uploaded" });
    }


    // Call the uploadImage function from the model

    console.log("Received file:", file.originalname);
    console.log("File size:", file.size, "bytes");
    console.log("File mimetype:", file.mimetype);


    uploadImage(file)
        .then((data) => res.status(201).send(data))
        .catch(next);
}