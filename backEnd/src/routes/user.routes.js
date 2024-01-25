import express from "express"
import { registerUser } from "../controller/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const route  = express.Router()

route.route("/register").post(upload.fields([
    {
      name:"avatar",
      maxCount:1
    }

]) ,registerUser)

export default route