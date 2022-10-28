import Category from "../Models/Category.js";

export const Upload_Category = async (req, res) => {
    const { category, subcategory } = req.body
    try {
        if (!category || !subcategory) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        const CheckCategory = await Category.findOne({ category });
        if (CheckCategory) {
            return res.status(400).json({ msg: 'Category aleardy exists' });
        }
        new Category({ category, subcategory })
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

export const Update_Category = async (req, res) => {
    const { category, subcategory } = req.body
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
        await Category.findByIdAndRemove({ _id: req.body.id })
        return res.status(200).json({ msg: 'Category Deleted successfully' })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
