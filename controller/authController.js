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
        },process.env.ACCESS_TOKEN_KEY,{ expiresIn: "50s" })
    }
    //REFRESH_TOKEN
    async generateRefreshToken(user) {
        return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },process.env.REFRESH_TOKEN_KEY,{ expiresIn: "365d" })
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
            res.status(200).json({
                message: "Đăng ký thành công"
            })
        } catch(err) {
            return res.status(404).json({
                message: "Đăng ký thất bại"
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
                const {password,...other}=user._doc
                //console.log(other)
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                });
                return res.status(200).json({
                    message: "Đăng nhập thành công",
                    accessToken
                })
            }
        } catch (err) {
            return res.status(404).json({
                message: "Đăng nhập thất bại"
            })
        }
    }
    // Refresh Token
    async refreshToken(req,res) {
        try {
            const authControllers=new authController
            const refreshToken=req.cookies.refreshToken
            console.log(refreshToken)
            if (!refreshToken) return res.status(401).json("You're not authenticated")
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,async (err,user)=>{
                if (err) console.log(err)
                const newAccessToken=await authControllers.generateAccessToken(user)
                const newRefreshToken=await authControllers.generateRefreshToken(user)
                res.status(200).json({
                    message: "success",
                    newAccessToken,
                    newRefreshToken
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
            res.clearCookie("refreshToken",{
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            return res.status(200).json({
                message: "Đăng xuất thành công"
            })
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }

}
module.exports= new authController
