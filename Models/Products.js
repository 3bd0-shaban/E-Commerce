import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50,
        required: [true, 'Product name is Required'],
    },
    des: {
        type: String,
        required: [true, 'Description is Required'],
        maxLenght: [4000, 'Description must be less than 4000 chartacter']
    },
    fulldes: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Price is Required'],
    },
    discountprice: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is Required'],
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Sub Category is Required'],
    },
    stock: {
        type: Number,
        default: 1,
        required: [true, 'Number of products in stock is Required'],
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: [true, 'brand is Required'],
    },
    numofview: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0
    },
    numofreviews: {
        type: Number,
        default: 0,
    },
    sumOfRating: {
        type: Number,
        default: 0,
    },
    warranty: {
        type: Boolean,
        default: false
    },
    specs: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    images: [
        {
            public_id: {
                type: String,
                required: [true, 'The Product image is Required'],
            },
            url: {
                type: String,
                required: [true, 'The Product image is Required'],
            }
        }
    ]
},
    { timestamps: true }
);
const Products = mongoose.model('Products', ProductSchema);
export default Products;