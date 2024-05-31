const userRouter=require("./user")
const authRouter=require("./auth")
const productRouter=require("./products")

const route=(app)=>{
    app.use("/v1/user",userRouter)
    app.use("/v1/user",authRouter)
    app.use("/v1/product",productRouter)
}
module.exports=route


