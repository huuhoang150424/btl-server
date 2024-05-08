const express=require("express")
const Router=express.Router()

const productsController=require("../controller/productsController")

// [getAll]
Router.get('/getAllProducts',productsController.getAll)
// [getDetails]
Router.get('/getProduct/:id',productsController.getDetail)
// [create]
Router.post('/createProduct',productsController.createProduct)
// [getDetails]
Router.put('/updateProduct/:id',productsController.updateProduct)
// [getDetails]
Router.delete('/deleteProduct/:id',productsController.deleteProduct)



module.exports=Router