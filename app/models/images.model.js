const { supabase } = require("../../db/supabaseConfig");
const { decode } = require('base64-arraybuffer');
const fs = require('fs');


//test image upload house_harmony.png to supabase storage
async function uploadImage(filePath, fileName) {

    const file = new File([filePath], fileName, {
        type: 'image/png' // Specify the correct MIME type for your image
    });
    console.log("File to upload:", file.name, file.size, file.type);
    const base64Data = await readFileAsBase64(filePath);
    const fileBase64 = decode(base64Data); // Decode base64 string to ArrayBuffer
    console.log("Base64 data length:", fileBase64.byteLength);

    const { data, error } = await supabase.storage.from('images').upload(file.name, fileBase64, {
        contentType: 'image/png', // Specify the correct MIME type for your image       
    });


    if (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
    console.log("Image uploaded successfully:", data);

    //get public URL of the uploaded image
    /*  const { data, error } = await supabase.storage.from('images').getPublicUrl(fileName);
  
      if (error) {
          console.error("Error getting public URL:", error);
          throw error;
      }
  
      console.log("Public URL of the uploaded image:", data);
  
      // Optionally, you can return the public URL
      return data.publicUrl;*/
}

function readFileAsBase64(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return reject(err);
            }
            resolve(data);
        });
    });
}




/*uploadImage('/home/kiran/project/house_harmony/images/house_harmony.png', 'house_harmony.png')
    .then(() => console.log("Image upload process completed."))
    .catch((error) => console.error("Error in image upload process:", error));*/