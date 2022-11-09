import mongoose from 'mongoose';
const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    }],
    active: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true }
)

const Cart = new mongoose.model('cart', CartSchema);
export default Cart
