import mongoose from "mongoose"
import { dbName } from "../constant.js"

// FUNCTION FOR CONNECTING DATABASE
const connectDb = async ()=>{

    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`)
        console.log(`Database connected Sucessfully!! Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDb connection Error", error)
        process.exit(1)
    }
}

export default connectDb