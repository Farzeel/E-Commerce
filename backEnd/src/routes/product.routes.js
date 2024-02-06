import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { VerifyJWT } from "../middlewares/auth.middleware.js"
import { addProduct, getProductDetailsById, updateProduct } from "../controller/product.controller.js"
import checkIsAdmin from "../middlewares/admin.middleware.js"


const route  = express.Router()

route.route("/addProduct").post(VerifyJWT,checkIsAdmin, upload.fields([
    {
      name:"productPhotos",
      maxCount:4
    }

]) ,addProduct)

route.route("/productDetails/:productId").get(getProductDetailsById)
route.route("/updateProduct/:productId").put(updateProduct)




export default route