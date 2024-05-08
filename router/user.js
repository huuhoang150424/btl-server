const express=require("express")
const Router=express.Router()
const {verifyTokenAndUserAuthorization,verifyTokenAdmin,verifyTokenUserAuthorization}=require("../middleware/verifyToken")

const userController=require("../controller/userController")

// [get] getAll
Router.get("/getAllUsers",verifyTokenAdmin,userController.getAllUser)
// [update] updateUser
Router.put("/update/:id",verifyTokenUserAuthorization,userController.updateUser)
// [get] getUser
Router.get("/getUser/:id",userController.getAnUser)
// [getAnUser] getAnUser
Router.delete("/delete/:id",verifyTokenAdmin,userController.deleteUser)

module.exports=Router