const { supabase } = require("../../db/supabaseConfig");
const { decode} = require("base64-arraybuffer")
const fs = require("fs");

async function uploadImage(file) {
  
    const base64Data = file.buffer.toString("base64");
    console.log("Base64 data length:", base64Data.length);
    console.log("Base64 data type:", typeof base64Data);
    console.log("File name:", file.originalname);
    const { data, error } = await supabase.storage
        .from("images")
        .upload(file.originalname , decode(base64Data), {
            contentType: "image/png",
            upsert: true
        });
    if (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
    return data;
}


module.exports = { uploadImage };