import mongoose, { Schema } from "mongoose";


// DEFINING THE Product SCHEMA
const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId , 
        ref:"User",
      
    },
    products:[
       { 
        product:
        {
            type:Schema.Types.ObjectId, 
            ref:"Product" ,
            required:true
        }, 
        
         quantity:{
            type:Number,
            required:true
         }
       }
    ],

    totalAmount:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending',
      },
  
},

{
    timestamps:true
}
)


// EXPORT THE Product SCHEMA
export const Order = mongoose.model("Order",orderSchema)