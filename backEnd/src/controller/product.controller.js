import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { fileUploadOnCloudonary } from "../utils/cloudinary.js";

const addProduct = async (req, res) => {
  try {
    const {
      price,
      productName,
      productDescription,
      availableQuantity,
      category,
    } = req.body;

    if (
      [price, productName, availableQuantity, category, productDescription].some(
        (field) => field.trim() === ""
      )
    ) {
      //   throw new ApiError(400, "All Fileds Required")
      return res.status(400).json(new ApiError(400, "All Fileds Required"));
    }

    const productPhotoLocalPath = req.files?.productPhotos?.map(
      (file) => file.path
    );

    if (!productPhotoLocalPath || productPhotoLocalPath?.length === 0) {
      return res.status(400).json(new ApiError(400, "Photo is Required"));
    }

    let cloudinaryUrls = [];
    await Promise.all(
      productPhotoLocalPath.map(async (localPath, index) => {
        try {
          const cloudinaryUrl = await fileUploadOnCloudonary(localPath);
          cloudinaryUrls.push(cloudinaryUrl.url);
        } catch (uploadError) {
          // Handle the error for the current file but allow other files to continue
          console.error(
            `Error uploading file ${index + 1}:`,
            uploadError.message
          );
          cloudinaryUrls.push(null); // or any placeholder value indicating an error
        }
      })
    );

    if (!cloudinaryUrls || cloudinaryUrls?.length === 0) {
      return res.status(400).json(new ApiError(400, "Photo is Required"));
    }

    // Check if any files failed to upload
    if (cloudinaryUrls.includes(null)) {
      return res
        .status(500)
        .json(new ApiError(500, "Some files failed to upload"));
    }

    const newproduct = await Product.create({
      price,
      productName,
      productDescription,
      availableQuantity,
      category,
      productImage: cloudinaryUrls,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, newproduct, "Product Added Successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(400, "Internal Server Error"));
  }
};

const getProductDetailsById = async (req,res)=>{

  try {  
    const {productId} = req.params
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json(new ApiError(400, " Invalid id format !"));
    }
    const product = await Product.findById(productId)
    
    if (!product) {
      return res.status(404).json(new ApiError(400, "No product found "));
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product));
  
} catch (error) {

  console.log(error)
  return res.status(500).json(new ApiError(400, "Internal Server Error"));
}
}

const updateProduct = async (req, res)=>{
 
try {
  
  const {productId} = req.params
  const updatefields = req.body
  if(!mongoose.Types.ObjectId.isValid(productId)){
    return res.status(400).json(new ApiError(400, " Invalid id format !"));
  }
  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    return res.status(400).json(new ApiError(400, " Product not found!"));
  }

 Object.keys(updatefields).forEach(key=>{
  if(key !=='productPhoto' && updatefields[key]){
       existingProduct[key] = updatefields[key]
  }
 })

 const updatedProduct = await existingProduct.save();
 return res
 .status(200)
 .json(new ApiResponse(200, updatedProduct));

  
} catch (error) {
  console.log(error)
  return res.status(500).json(new ApiError(400, "Internal Server Error"));
}


}

export { addProduct, getProductDetailsById, updateProduct };
