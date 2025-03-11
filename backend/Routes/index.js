const express=require("express")

const userRouter = require("./userRouter")
const custRouter = require("./custRouter")
const router =express()
router.use("/user",userRouter)
router.use("/cust",custRouter)

module.exports=router