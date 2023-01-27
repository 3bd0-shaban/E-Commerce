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
    roles: {
      type: [String],
      default: ["user"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: Number,
    address: [
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
        street: {
          type: String
        },
        floor: {
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

const Users = mongoose.model('Users', usesrSchema);
export default Users;
