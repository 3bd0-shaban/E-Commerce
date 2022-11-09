import mongoose from 'mongoose';
const AddressSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    address: [
        {
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
},
    { timestamps: true }
)
const Address = new mongoose.model('Adress', AddressSchema);
export default Address
