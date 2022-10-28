import moongose from 'mongoose'
const CategorySchema = new moongose.Schema({
    category: {
        type: String,
        required: true
    },
    subcategory: [
        {
            type: String,
            required: true
        }
    ]

}, { timestamps: true });
const Category = moongose.model('Category', CategorySchema);
export default Category