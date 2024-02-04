import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

const checkIsAdmin = async (req, res ,next)=>{
try {
    const user = await User.findById(req.user._id)
    
    if(user.isAdmin === false){
        return res.status(403).json(new ApiError(400,"only admin can Add the products"))
    }
    next()
} catch (error) {
    console.log({adminMiddleware:error.message})
}
}


export default checkIsAdmin