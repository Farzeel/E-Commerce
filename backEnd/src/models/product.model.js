import mongoose, { Schema } from "mongoose";


// DEFINING THE Product SCHEMA
const productSchema = new Schema({
    price:{
        type:String , 
        required:true,
      
    },
    productName:{
        type:String , 
        required:true,
    },
    productDescription:{
        type:String , 
        required:true,
    },
    availableQuantity:{
        type:Number ,
        required:true 
    },
    category:{
        type:String,
        required:true
    },
    productImage:[{type:String, required:true}]
},

{
    timestamps:true
}
)





// EXPORT THE Product SCHEMA
export const Product = mongoose.model("Product",productSchema)