import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    numofitems: {
        type: Number,
        default: 0
    },
    items: [
        {
            product_Id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quentity: {
                type: Number,
                default: 0
            },
            created: {
                type: Date,
                default: Date.now
            },
        }
    ]
}, { timestamps: true });
const Cart = mongoose.model('cart', CartSchema);
export default Cart