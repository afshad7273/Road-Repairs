const express=require("express")

const custController = require("../Controllers/custController")
const custRouter=express.Router()
custRouter.get("/develop",custController.develop)


module.exports=custRouter