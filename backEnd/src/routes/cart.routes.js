import express from "express";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart, getUserCartItems } from "../controller/cart.controller.js";

const route = express.Router();

route.route("/addToCart").post(VerifyJWT, addToCart);
route.route("/userCartItems").get(VerifyJWT, getUserCartItems);

export default route;
