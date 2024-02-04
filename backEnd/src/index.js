import dotenv from "dotenv"
dotenv.config({
    path:"./env"
});

import cors from "cors"
import express from "express"
import connectDb from "./db/db.js"
import cookieParser from "cookie-parser"

const app  =express()

const port = process.env.PORT || 6000

app.use(cors({
    origin:[process.env.CORS_ORIGIN],
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log("App is listening on port ", port)
    })
})
.catch((err)=>{
     console.log("Database connection failed", err)
})

// ROUTES IMPORT
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";


// ROUTE DECLARATION
app.use("/api/v1/users", userRoute)
app.use("/api/v1/admin", productRoute)