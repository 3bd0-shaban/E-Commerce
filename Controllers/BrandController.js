import Users from "../Models/Users.js";
import Brand from "../Models/Brand.js";
export const Add_New_Brand = async (req, res) => {
    try {
        const { name, products, discription } = req.body
        const file = req.body.image;
        if (!file) return res.status(400).json({ msg: 'Image is required to upload ' });
        const result = await cloudinary.uploader.upload(file, {
            folder: "E-Commerce/Brand",
        });
        new Brand({
            name, products, discription,
            image: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        })
            .save()
            .then(New_Brand => {
                return res.status(200).json({ msg: 'Banner uploaded successfully', New_Brand });
            }).catch(error => {
                return res.status(500).json({ msg: error.message })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_All_Brands = async (req, res) => {
    try {
        const brand = await Brand.find();
        if (!brand) return res.status(201).json({ msg: 'No Brands Founded' });
        return res.json(brand);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_Brand = async (req, res) => {
    try {
        const brand = await Brand.find(req.params.id);
        if (!brand) {
            return res.status(201).json({ msg: 'Log in' });
        }
        await deleteOne({ _id: req.params.id });
        return res.json({ msg: 'Brand Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}
