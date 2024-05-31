const express=require("express")
const Router=express.Router()
const uploadCloud = require('../config/cloudinary.config')
const {verifyTokenAndUserAuthorization,verifyTokenAdmin,verifyTokenUserAuthorization}=require("../middleware/verifyToken")

const userController=require("../controller/userController")

// [get] getAll
Router.get("/getAllUsers",verifyTokenAdmin,userController.getAllUser)
// [update] updateUser
Router.put("/update/:id",verifyTokenUserAuthorization,userController.updateUser)
// [get] getUser
Router.get("/getUser/:id", verifyTokenUserAuthorization, userController.getAnUser)
// [getAnUser] getAnUser
Router.delete("/delete/:id",verifyTokenAdmin,userController.deleteUser)
// [upload] upload file image
Router.post("/avatar/:id",uploadCloud.single('image'),userController.u)

module.exports=Router