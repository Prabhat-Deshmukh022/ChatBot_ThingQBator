import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const cloudinary_upload = async (filePath) => {
    try {
        if(!filePath) return null

        const cloud = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            image_metadata: true
        })
        console.log("Successfully uploaded - ", cloud.url);
        fs.unlinkSync(filePath)
        return {
            secure_url: cloud.secure_url,
            public_id: cloud.public_id,
            duration: cloud?.vid_info?.duration // Access duration from upload response
        };
    }
    catch (error) {
        fs.unlinkSync(filePath) //if upload fails we remove it from our local system
        return null
    }
}

export {cloudinary_upload}
