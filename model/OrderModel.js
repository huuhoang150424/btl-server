const mongoose=require("mongoose")
const {Schema}=mongoose

const OrderSchema=new Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            discount: { type: Number },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    //user
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    //kiểm tra thanh toán
    isPaid: { type: Boolean, default: false },
    //thơi gian giao hàng
    paidAt: { type: Date },
    //kiểm tra giao hàng
    isDelivered: { type: Boolean, default: false },
    //thơi gian giao hàng
    deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    })
module.exports=new mongoose.model('orders',OrderSchema)