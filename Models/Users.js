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
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/abdo9/image/upload/v1664213293/samples/people/istockphoto-1300845620-612x612_ose5xw.jpg"
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model('Users', usesrSchema);
export default Users;