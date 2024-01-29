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
    return res.status(500).json(
        new ApiError(400, "Internal Server Error")
    )
}

}

const loginUser =  async (req , res)=>{
   try {
     const {email, password} = req.body
 
     if ([email,password].some(field=>field.trim()==="")) {
         return res.status(400).json(
             new ApiError(400,  "both Fileds Required")
         )
     }
 
     const userExist = await User.findOne({email})
     if (!userExist) {
         return res.status(401).json(
             new ApiError(400,  "Authentication failed: Invalid Credentials")
         )
     }
    
     const isPasswordCorrect  = await userExist.isPasswordCorrect(password)
 
     if (!isPasswordCorrect) {
         return res.status(401).json(
             new ApiError(400,  "Authentication failed: Invalid Credentials. Try Again ")
         )
     }
 
     const accessToken = await userExist.generateAccessToken()
 
     const loggedInUser = await User.findById(userExist._id).select("-password ")
 
 const option = {
     htppOnly:true,
     secure:true
 }
 
 return res.status(200)
 .cookie("accessToken",accessToken, option)
 .json(new ApiResponse(200, loggedInUser, "user loggedIn Successfully "))
   } catch (error) {
    console.log(error)
    return res.status(500).json(
        new ApiError(400, "Internal Server Error")
    )
   }

}


const logoutUser  = async (req, res)=>{
    const option = {
        htppOnly:true,
        secure:true
    }
    
    return res.status(200)
    .clearCookie("accessToken",option)
    .json(new ApiResponse(200, {}, "User LoggedOut "))
    
}



export {registerUser, loginUser, logoutUser}