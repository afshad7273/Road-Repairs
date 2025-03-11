const express=require("express")

const userController = require("../Controllers/userController")
const userRouter=express.Router()
userRouter.get("/add",userController.add)
userRouter.get("/sum",userController.sum)

module.exports=userRouter