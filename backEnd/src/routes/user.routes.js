import express from "express"
import { registerUser } from "../controller/user.controller.js"

const route  = express.Router()

route.route("/register").post(registerUser)

export default route