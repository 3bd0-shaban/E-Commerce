import mongoose from "mongoose";
const BannersSchema = new mongoose.Schema({

    banners: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }

},
    { timestamps: true }
);
const Banners = mongoose.model('Banners', BannersSchema);
export default Banners;