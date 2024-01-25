import dotenv from "dotenv"
dotenv.config({
    path:"./env"
});

import express from "express"
import connectDb from "./db/db.js"

const app  =express()

const port = process.env.PORT || 6000

app.use(express.json({limit:"16kb"}));
app.use(express.static("public"))

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


// ROUTE DECLARATION
app.use("/api/v1/users", userRoute)