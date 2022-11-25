import mongoose from "mongoose";
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    discription: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: [true, 'The Product image is Required'],
        },
        url: {
            type: String,
            required: [true, 'The Product image is Required'],
        }
    }

}, { timestamps: true });
const Brand = mongoose.model('Brand', BrandSchema);
export default Brand