const mongoose=require("mongoose")
const {Schema}=mongoose

const UsersSchema=new Schema(
    {
        name: { type: String,required: true },
        email: {
            type: String,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            unique: true,
            require: true,
        },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String,default:"https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" },
        city: {type: String}
    },
    {
        timestamps: true
    }
)

module.exports=new mongoose.model('users',UsersSchema)