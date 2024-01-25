import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { fileUploadOnCloudonary } from "../utils/cloudinary.js"
import fs from "fs/promises"


const registerUser = async (req,res)=>{

try {
    const {username , email , password} = req.body
    
    if([username , email , password].some(field => field.trim() ==="")){
    //   throw new ApiError(400, "All Fileds Required")
      return res.status(400).json(
        new ApiError(400,  "All Fileds Required")
    )
    }

    const existedUser = await User.findOne({$or:[{email},{username}]})

    if (existedUser) {
         fs.unlink(req.files.avatar[0].path)
        return res.status(409).json(
            new ApiError(400, "user with this email or username already exist. please try with other email or username")
        )
       
    }

    const avatarLocalPath = req.files?.avatar[0].path

    const avatar = await fileUploadOnCloudonary(avatarLocalPath)

    const user  = await User.create({
        username,   
        email,
        password,
        avatar:avatar?.url || "" ,
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

     return res.status(201).json(
        new ApiResponse(200, createdUser , "User Registered Successfully")
    )



} catch (error) {
    console.log(error)
    throw new ApiError(500, "Internal Server Error. Please try again after few Seconds")
}

}

export {registerUser}