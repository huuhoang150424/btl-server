const express=require("express")
const Router=express.Router()
const {verifyTokenAdmin,verifyTokenUserAuthorization}=require("../middleware/verifyToken")
const userController=require("../controller/userController")
const uploadCloud=require("../config/cloudinary.config")

// [get] getAll
Router.get("/getAllUsers",verifyTokenAdmin,userController.getAllUser)
// [update] updateUser
Router.put("/update/:id",verifyTokenUserAuthorization,uploadCloud.single('avatar'),userController.updateUser)
// [get] getUser
Router.get("/getUser/:id", verifyTokenUserAuthorization, userController.getAnUser)
// [getAnUser] getAnUser
Router.delete("/delete/:id",verifyTokenAdmin,userController.deleteUser)


module.exports=Router