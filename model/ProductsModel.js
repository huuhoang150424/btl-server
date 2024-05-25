const mongoose=require("mongoose")
const {Schema}=mongoose

const ProductsSchema=new Schema(    {
    name: { type: String, required: true, unique: true },
    image: [
        { type: String, required: true }
    ],
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number }
},
{
    timestamps: true,
})
module.exports=new mongoose.model('products',ProductsSchema)