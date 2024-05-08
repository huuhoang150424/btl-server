const express=require("express")
const Router=express.Router()

const authController=require("../controller/authController")

// [Register]
Router.post('/register',authController.register)

// [Login]
Router.post('/login',authController.login)
//Cấp lại token mới

Router.post('/refresh',authController.refreshToken)



module.exports=Router