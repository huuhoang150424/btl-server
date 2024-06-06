const express=require("express")
const Router=express.Router()
const {verifyTokenAdmin}=require("../middleware/verifyToken")
const productsController=require("../controller/productsController")
const uploadCloud=require("../config/cloudinary.config")

// [getAll]
Router.get('/getAllProducts',productsController.getAll)
// [getDetails]
Router.get('/getProduct/:id',productsController.getDetail)
// [create]
Router.post('/createProduct',verifyTokenAdmin,uploadCloud.single('image'),productsController.createProduct)
// [getDetails]
Router.put('/updateProduct/:id',verifyTokenAdmin,uploadCloud.single('image'),productsController.updateProduct)
// [getDetails]
Router.delete('/deleteProduct/:id',verifyTokenAdmin,productsController.deleteProduct)


module.exports=Router