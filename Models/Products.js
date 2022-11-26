import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is Required'],
    },
    des: {
        type: String,
        required: [true, 'Description is Required'],
        maxLenght: [4000, 'Description must be less than 4000 chartacter']

    },
    price: {
        type: Number,
        required: [true, 'Price is Required'],
    },
    discountprice: {
        type: Number,
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Category is Required'],
    },
    subcategory: {
        type: String,
        required: [true, 'Sub Category is Required'],
    },
    stock: {
        type: Number,
        default: 1,
        required: [true, 'Number of products in stock is Required'],
    },
    brand: {
        type: String,
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
        type: Number,
        default: 1
    },
    specifications: [
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
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'Users',
                required: true
            }, name: {
                type: String,
                required: true,
            }, rating: {
                type: Number,
                required: true,
            }, comment: {
                type: String,
            }, time: {
                type: Date,
                default: Date.now()
            },
        },
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