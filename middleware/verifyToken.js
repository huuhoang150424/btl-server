const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const verifyToken=(req,res,next)=>{
    const token=req.headers.token
    //console.log(req.headers)
    if (token) {
        const accessToken=token.split(" ")[1]
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,(err,user)=>{
            if (err) return res.status(403).json("Token is not valid")
            req.user=user
            //console.log(req.user)
            next()
        })
    } else {
        res.status(403).json("you're not authenticated")
    }
}
const verifyTokenAndUserAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user && (req.user.id===req.params.id||req.user.isAdmin)) {
            next()
        } else {
            return res.status(403).json("you're not allow to do that")
        }
    })
}
const verifyTokenAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("you're not allow to do that")
        }
    })
}

const verifyTokenUserAuthorization=(req,res,next)=>{
    //console.log(req.headers.token)
    // console.log(req.user)
    verifyToken(req,res,()=>{
        if (req.user && (req.params.id===req.user.id)) {
            next()
        } else {
            return res.status(403).json("you're not allow to do that")
        }
    })
}
const verifyTokenUser=(req,res,next)=>{
    //console.log(req.headers.token)
    verifyToken(req,res,()=>{
        if (req.user) {
            next()
        } else {
            return res.status(403).json("you're not allow to do that")
        }
    })
}
module.exports={
    verifyToken,
    verifyTokenAndUserAuthorization,
    verifyTokenAdmin,
    verifyTokenUserAuthorization,
    verifyTokenUser
}





