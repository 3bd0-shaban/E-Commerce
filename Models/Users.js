import mongoose from 'mongoose';
const AddressSchema = new mongoose.Schema(
  {
    PhoneNumber: {
      type: Number,
      required: true
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
)
mongoose.model('Address', AddressSchema);
const usesrSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50
    },
    password: {
      type: String,
      required: true,
      min: 6,
      select: false
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: [AddressSchema],
    whiteList: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products'
        }
      }
    ]
  },
  { timestamps: true, minimize: false }
);
mongoose.model('Address', AddressSchema);
const Users = mongoose.model('Users', usesrSchema);
export default Users;