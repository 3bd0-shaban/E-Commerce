import mongoose from "mongoose";
const IssessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Please type the problem you have in website ']
    }
}, { timestamps: true });
const Issess = mongoose.model('Issess', IssessSchema);
export default Issess