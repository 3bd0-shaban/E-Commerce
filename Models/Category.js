import mongoose from 'mongoose'
const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subcategory: [
        {
            type: String,
            required: true
        }
    ],
    image: {
        public_id: {
            type: String,
            required: [true, 'The Product image is Required'],
        },
        url: {
            type: String,
            required: [true, 'The Product image is Required'],
        }
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });
const Category = mongoose.model('Category', CategorySchema);
export default Category