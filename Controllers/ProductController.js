import Products from "../Models/Products.js";
import cloudinary from "../Utils/cloudinary.js";
export const UploadProduct = async (req, res) => {
    try {

        const { name, price, stock, des, brand, category, image, specifications, images } = req.body
    
        const file = req.body.preview

        // if (file.size > 1024 * 1024) {
        //     removeTmp(file.tempFilePath);
        //     return res.status(400).json({ msg: 'Size too large' });
        // }
        console.log(file)
        const result = await cloudinary.uploader.upload(file, {
            folder: "Market",
        });
        // image({
        //     public_id: result.public_id,
        //     url: result.secure_url
        // });
        console.log(result)
        new Products({
            name, price, stock, des, brand, category, specifications,image,
                image:{
                    public_id: result. public_id,
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