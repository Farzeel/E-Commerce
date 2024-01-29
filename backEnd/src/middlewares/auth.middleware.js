import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

const VerifyJWT = async (req, res, next) =>{
const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

if(!token){
    return res.status(401).json(new ApiError(400, "UnAuthorized Request"))
}

const decodetoken = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET)

const user = await User.findById(decodetoken._id).select("-password ")

if (!user) {
    return res.status(401).json(new ApiError(400,"Invalid AccessToken"))
}

req.user = user
next()

}

export {VerifyJWT}