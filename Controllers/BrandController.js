import Brand from "../Models/Brand.js";
import cloudinary from "../Utils/cloudinary.js";
export const Add_New_Brand = async (req, res) => {
    try {
        const { brand, des } = req.body
        const file = req.body.image;
        if (!brand || !des) return res.status(400).json({ msg: 'Please Fill all fields' });
        const CheckBrand = await Brand.findOne({ brand });
        if (CheckBrand) {
            return res.status(400).json({ msg: 'Category aleardy exists' });
        }
        const result = await cloudinary.uploader.upload(file, {
            folder: "E-Commerce/Brand",
        });
        new Brand({
            brand, des,
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
    };
};
export const Fetch_All_Brands = async (req, res) => {
    try {
        const brand = await Brand.find().limit(8);
        if (!brand) return res.status(201).json({ msg: 'No Brands Founded' });
        return res.json(brand);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    };
};
export const Get_Spicific_Brand = async (req, res) => {
    try {
        const BrandDetails = await Brand.findById(req.params.id);
        if (!BrandDetails) return res.status(400).json({ msg: 'Brand does not exists' });
        return res.json(BrandDetails)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    };
};

export const Delete_Brand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(201).json({ msg: 'No Brand founded with that id' });
        };
        await cloudinary.uploader.destroy(brand.image.public_id);
        await Brand.deleteOne({ _id: req.params.id });
        return res.json({ msg: 'Brand Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    };
};
export const Update_Brand = async (req, res) => {
    try {
        let newBrand = {};
        const { brand, des } = req.body
        const file = req.body.image;
        const isBrand = await Brand.findById(req.params.id);
        if (!isBrand) {
            return res.status(400).json({ msg: 'No Brand Founded with this ID Or something happened' });
        };
        const CheckBrand = await Brand.findOne({ brand });
        if (CheckBrand) {
            return res.status(400).json({ msg: 'Brand aleardy exists' });
        };
        if (file) {
            await cloudinary.uploader.destroy(isBrand.image.public_id);
            const result = await cloudinary.uploader.upload(file, {
                folder: "E-Commerce/Brand",
            });
            newBrand = {
                image: {
                    public_id: result.public_id,
                    url: result.secure_url,
                }
            };
        };
        const UdatedBrand = await Brand.findByIdAndUpdate(req.params.id, { brand, des, newBrand }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        return res.status(200).json({ msg: 'Brand updated successfully', UdatedBrand })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    };
};