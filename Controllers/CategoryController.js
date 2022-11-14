import Category from "../Models/Category.js";

export const Upload_Category = async (req, res) => {
    const { category, subcategory, products } = req.body
    const file = req.body.image;
    try {
        if (!category || !subcategory) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        const CheckCategory = await Category.findOne({ category });
        if (CheckCategory) {
            return res.status(400).json({ msg: 'Category aleardy exists' });
        }
        const result = await cloudinary.uploader.upload(file, {
            folder: "E-Commerce/Category",
        });
        new Category({
            category, subcategory, products,
            image: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        })
            .save()
            .then((Uploaded_Category) => {
                return res.status(200).json({ msg: 'Category Created Successfully', Uploaded_Category });
            }).catch(error => {
                return res.status(500).json({ msg: error.message })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const Get_All_Category = async (req, res) => {
    try {
        const Get_Category = await Category.find()
        return res.json(Get_Category)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const Update_Category = async (req, res) => {
    try {
        const isCategory = await Category.findById(req.params.id);
        if (!isCategory) {
            return res.status(400).json({ msg: 'No Category Founded with this ID Or something happened' });
        };
        const CheckCategory = await Category.findOne({ category });
        if (CheckCategory) {
            return res.status(400).json({ msg: 'Category aleardy exists' });
        };
        const UpdatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        return res.status(200).json({ msg: 'Category updated successfully', UpdatedCategory })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_Category = async (req, res) => {
    try {
        const isCategory = await Category.findById(req.params.id);
        if (!isCategory) {
            return res.status(400).json({ msg: 'No Category Founded with this ID Or something happened' });
        };
        await Category.deleteOne({ _id: req.params.id });
        return res.status(200).json({ msg: 'Category Deleted successfully' })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
