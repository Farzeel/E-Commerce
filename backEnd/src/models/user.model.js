import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// DEFINING THE USER SCHEMA
const userSchema =new Schema({
    username:{
        type:String , 
        required:true,
        lowercase:true,
        unique: true
    },
    email:{
        type:String , 
        required:true,
        lowercase:true,
        unique: true
    },
    password:{
        type:String , 
        required:true,
    },
    avatar:{
        type:String , 
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},

{
    timestamps:true
}
)

// HASHED THE PASSWORD USING PRE PLUGIN
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }
 
try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
    
        return next()
} catch (error) {
    return next(error)
}

})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
 }

 userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
             _id : this._id,
             username:this.username,
          
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


// EXPORT THE USER SCHEMA
export const User = mongoose.model("User",userSchema)