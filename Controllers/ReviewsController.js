import Products from "../Models/Products.js";
export const Send_New_Review = async (req, res) => {
    try {
        const { comment, rating } = req.body
        const product = await Products.findById(req.params.id).populate('reviews.user');
        if (!product) {
            return res.status(201).json({ msg: 'Product not founded or may be you not eligable to add a review at this product' });
        }
        const AlreadyCommented = product.reviews.find((p) => p.user._id == req.user.id);
        if (AlreadyCommented) {
            return res.status(201).json({ msg: 'You already submitted a review' });
        }
        if (!comment || !rating) {
            return res.status(201).json({ msg: 'Please add a comment and review to prosses your review' });
        }
        await Products.findByIdAndUpdate(req.params.id, {
            $push: {
                reviews: { user: req.user._id, name: req.user.firstname + ' ' + req.user.lastname, rating, comment }
            },
            $inc: { numofreviews: 1, sumOfRating: rating },
        }, { new: true });
        const SetRating = await Products.findByIdAndUpdate(req.params.id, {
            $set: { rating: product.sumOfRating / product.numofreviews }
        }, { new: true });
        return res.json({ msg: "Your review added successfully", SetRating });

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_Product_Review = async (req, res) => {
    try {
        const reviews = await Products.findById(req.params.id);
        if (!reviews) return res.status(201).json({ msg: 'Product not founded or may be you not eligable to add a review at this product', });
        return res.json(reviews);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_User_Review = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}
