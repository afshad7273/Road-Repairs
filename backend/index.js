const express=require("express")
require("dotenv").config()
const app=express()
const router=require("./Routes")
app.use(router)

app.listen(process.env.PORT,()=>console.log(`server is running on port${process.env.PORT}`))