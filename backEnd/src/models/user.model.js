import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


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


// EXPORT THE USER SCHEMA
export const User = mongoose.model("User",userSchema)