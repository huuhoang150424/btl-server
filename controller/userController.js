const UsersSchema=require("../model/UserModel")


class userController {
    // [get]
    async getAllUser(req,res) {
        try {
            const allUsers=await UsersSchema.find()
            return res.status(200).json({
                message: "success",
                data: allUsers
            })
        } catch (err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // [Update]
    async updateUser(req,res) {
        try {
            const newUser= await UsersSchema.findByIdAndUpdate({_id: req.params.id},{avatar:req?.file?.path,...req.body},{new:true})
            return res.status(200).json({
                message: "cập nhật thành công",
                data: newUser
            })
        } catch (err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // [getAnUser]
    async getAnUser(req,res) {
        try {
            const User= await UsersSchema.findById(req.params.id)
            return res.status(200).json({
                message: "success",
                data: User
            })
        } catch (err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    //[delete]
    async deleteUser(req,res) {
        try {
            await UsersSchema.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message: "success",
            })
        } catch (err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    async uploadImg(req, res, next) {
        try {
            console.log(req.file)
            if (!req.file) {
                return res.status(404).json({
                    message: "not found Img"
                })
            }
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "web_ban_hang"
            })
            const user = await UsersSchema.findById(req.params.id)
            if (!user) {
                return res.status(404).json({ message: "User not found!" })
            }
            user.avatar = result.secure_url
            const newUser=await user.save()
            return res.status(200).json({
                message: "success",
                data: newUser
            })
        } catch (err) {
            return res.status(404).json({
                message: err
            })
        }
    }
}
module.exports= new userController