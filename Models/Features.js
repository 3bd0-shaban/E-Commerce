import mongoose from "mongoose";
const FeaturesSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    subcategory: {
        type: String,
        maxLenght: [4000, 'Description must be less than 4000 chartacter']
    },
    banners: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ]
},
    { timestamps: true }
);
const Features = mongoose.model('Features', FeaturesSchema);
export default Features;