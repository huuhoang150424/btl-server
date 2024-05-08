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
        avatar: { type: String },
        city: {type: String},
        // access_token: {type:String,require:true},
        // refresh_token: {type:String,require:true}
    },
    {
        timestamps: true
    }
)

module.exports=new mongoose.model('users',UsersSchema)