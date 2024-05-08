const UsersSchema=require("../model/UserModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

dotenv.config()


class authController {
    //ACCESS_TOKEN
    async generateAccessToken(user) {
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },process.env.ACCESS_TOKEN_KEY,{ expiresIn: "3m" })
    }
    //REFRESH_TOKEN
    async generateRefreshToken(user) {
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },process.env.ACCESS_TOKEN_KEY,{ expiresIn: "365d" })
    }

    // [POST] (register) 
    async register(req,res) {
        try {
            const salt=await bcrypt.genSalt(10)
            const hashed=await bcrypt.hash(req.body.password,salt)
            const newUser=new UsersSchema({
                ...req.body,
                password: hashed
            })
            await newUser.save()
            res.status(200).json("Success")
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // [POST] (register) 
    async login(req, res) {
        try {
            const authControllers=new authController
            const user=await UsersSchema.findOne({
                name: req.body.name
            })
            if (!user) {
                return res.status(404).json("Tên người dùng hoặc mật khẩu không đúng")
            }
            const validPassword=await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                return res.status(404).json("Tên người dùng hoặc mật khẩu không đúng")
            }
            if (user && validPassword) {
                //access token
                const accessToken=await authControllers.generateAccessToken(user) 
                //refresh token
                const refreshToken=await authControllers.generateRefreshToken(user) 
                const {password,...other }=user._doc
                return res.status(200).json({
                    refreshToken,
                    accessToken,
                    password,
                    other
                })
            }
        } catch (err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // Refresh Token
    async refreshToken(req,res) {
        try {
            const authControllers=new authController
            const refreshToken=req.headers.token.split(" ")[1]
            console.log(refreshToken)
            if (!refreshToken) return res.status(401).json("You're not authenticated")
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,async (err,user)=>{
                if (err) console.log(err)
                const newAccessToken=await authControllers.generateAccessToken(user)
                const newRefreshToken=await authControllers.generateRefreshToken(user)
                res.status(200).json({
                    token: newAccessToken
                })
            })
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // [POST] logout
    async logout(req,res) {
        try {
            
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }
}
module.exports= new authController
