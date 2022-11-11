import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    orderitems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    totalPrice: {
        type: Number,
        // required: true,
        default: 0
    },
    PhoneNumber: {
        type: Number,
        // required: true,
    },
    PaidBy: {
        type: Boolean,
        default: false
    },
    paymentInfo: {
        id: {
            type: String,
            // required: true
        },
        status: {
            type: String,
            // required: true
        },
    },
    deliveredAt: Date,
    shippedAt: Date,
    status: {
        type: String,
        default: 'Not processed',
        enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
const Orders = mongoose.model('Orders', OrderSchema);
export default Orders