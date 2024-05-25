const UsersSchema=require("../model/UserModel")



class userController {
    // [get]
    async getAllUser(req,res) {
        try {
            const allUsers=await UsersSchema.find()
            res.status(200).json({
                data: allUsers
            })
        } catch (err) {
            return res.status(404).json({
                message: "success",
                message: err
            })
        }
    }
    // [Update]
    async updateUser(req,res) {
        try {
            const newUser= await UsersSchema.findByIdAndUpdate({_id: req.params.id},req.body,{new:true})
            res.status(200).json({
                message: "success",
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
            res.status(200).json({
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
            res.status(200).json("deleteSuccess")
        } catch (err) {
            return res.status(404).json({
                message: "success",
                message: err
            })
        }
    }
}





module.exports= new userController