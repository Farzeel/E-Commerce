import express from "express"
import { loginUser, logoutUser, protectedRoute, registerUser } from "../controller/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { VerifyJWT } from "../middlewares/auth.middleware.js"


const route  = express.Router()

route.route("/register").post(upload.fields([
    {
      name:"avatar",
      maxCount:1
    }

]) ,registerUser)

route.route("/login").post(loginUser)
route.route("/logout").post(logoutUser)
route.route("/protected").post(VerifyJWT , protectedRoute)


export default route