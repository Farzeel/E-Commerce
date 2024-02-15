import express from "express";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart, getUserCartItems,deleteCartItem } from "../controller/cart.controller.js";

const route = express.Router();

route.route("/addItemToCart").post(VerifyJWT, addToCart);
route.route("/deleteCartItem").delete(VerifyJWT, deleteCartItem);
route.route("/userCartItems").get(VerifyJWT, getUserCartItems);

export default route;
