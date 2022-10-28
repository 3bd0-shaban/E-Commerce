import Products from "../Models/Products.js";
import cloudinary from "../Utils/cloudinary.js";
export const UploadProduct = async (req, res) => {
    try {

        const { name, price, stock, des, brand, category, image, specifications } = req.body
        const file = req.body.preview
        if (!name || !price || !stock || !des || !brand || !category || !file) {
            return res.status(400).json({msg: 'Please fill all fields'});
        }
        const result = await cloudinary.uploader.upload(file, {
            folder: "Market",
        });
        new Products({
            name, price, stock, des, brand, category, specifications, image,
            image: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        })
            .save()
            .then(Uploaded_Product => {
                return res.status(200).json({
                    msg: 'Product uploaded successfully', Uploaded_Product
                });
            }).catch(error => {
                console.log(error)

                return res.status(500).json({ msg: error.message })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}
// if (!req.files || Object.keys(req.files).length === 0)
// return res.status(400).json({ msg: 'No files were uploaded.' })

// const file = req.files.file;
// const banners = [];
// let bannersBuffer = [];
// for (let i = 0; i < banners.length; i++) {
// const result = await cloudinary.uploader.upload(file.tempFilePath[i], {
//     folder: "Banners",
// });
// bannersBuffer.push({
//     public_id: result.public_id,
//     url: result.secure_url
// })
// }
// req.body.banners = bannersBuffer


// new Banners({
// banners: {
//     public_id: result.public_id,
//     url: result.secure_url,
// }
// })
export const Fetch_Products = async (req, res) => {
    try {
        const Product = await Products.find();
        return res.status(200).json(Product);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_ProductDetails = async (req, res) => {
    try {
        const Product = await Products.findById(req.params.id);
        if (!Product) {
            return res.status(400).json({ msg: 'Product Not Founded' });
        } else {
            return res.json(Product);

        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Update_Product = async (req, res) => {
    try {
        const Product = await Products.findById(req.params.id);
        if (!Product) {
            return res.status(400).json({ msg: 'Product Not Founded with this Id' });
        } else {
            const Product = await Products.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: true,
            });
            return res.json(Product);

        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_Product = async (req, res) => {
    try {
        const Product = await Products.findById(req.params.id);
        if (!Product) {
            return res.status(400).json({ msg: 'Product Not Founded with this Id' });
        } else {
            await Products.findByIdAndRemove(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: true,
            });
            return res.status(200).json({ msg: 'Product deleted successfully' });


        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

        // let specs = [];
        // specifications.forEach((s) => {
        //     specs.push(JSON.parse(s))
        // });
        // specifications = specs