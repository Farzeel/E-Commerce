import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  const fileUploadOnCloudonary  = async (localfilepath)=>{

try {
    
        if (!localfilepath) return null
    
       const result = await cloudinary.uploader.upload(localfilepath, {
          resource_type:"auto" ,
          folder: "Ecommerce"
          
        });
      

        //    DELETE THE FILE FROM LOCAL SYSTEM
        fs.unlinkSync(localfilepath)
    
        return result
} catch (error) {
    console.log({cloudinary:error})
    fs.unlinkSync(localfilepath)
    return null
}

}

export {fileUploadOnCloudonary}

