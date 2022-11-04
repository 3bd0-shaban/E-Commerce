import mongoose from 'mongoose';
const usesrSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
      min: 3,
      max: 20
    },
    password: {
      type: String,
      required: true,
      min: 6,
      select:false
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/abdo9/image/upload/v1667589539/Market/Defaults/istockphoto-1300845620-612x612_bgwhwp.jpg"
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isshipper: {
      type: Boolean,
      default: false,
    },
    address: [
      {
        address: {
          type: String
        },
        city: {
          type: String
        },
        state: {
          type: String
        },
        country: {
          type: String
        },
        zipCode: {
          type: String
        },
        isDefault: {
          type: Boolean,
          default: false
        },
        updated: Date,
        created: {
          type: Date,
          default: Date.now
        }
      }
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Products'
        },
        quentity: {
          type: Number,
          default: 0
        },
        purchaseprice: {
          type: Number,
          default: 0
        },
        totalprice: {
          type: Number,
          default: 0
        },
        priceWithTax: {
          type: Number,
          default: 0
        },
        totalTax: {
          type: Number,
          default: 0
        },
        status: {
          type: String,
          default: 'Not processed',
          enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        },
        created: {
          type: Date,
          default: Date.now
        },
      }
    ]
  },
  { timestamps: true }
);
const Users = mongoose.model('Users', usesrSchema);
export default Users;