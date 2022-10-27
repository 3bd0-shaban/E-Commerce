import Banners from "../Models/Banners.js";
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: 'abdo9',
    api_key: '464953298584214',
    api_secret: 'Sbv2ng6sVzLNNLLxA9T6rmvKdtU',
    secure: true
});
export const Upload_Banners = async (req, res) => {

    try {
        const file = req.body.preview;
        // const { banners } = req.boby;
        // if (!banners) return res.status(400).json({ msg: 'Image is required to upload ' })
        if (!file) return res.status(400).json({ msg: 'Image is required to upload ' })
        const result = await cloudinary.uploader.upload(file, {
            folder: "Banners",
        });
        new Banners({
            banners: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        })
            .save()
            .then(Uploaded_Banners => {
                return res.status(200).json({ msg: 'Banner uploaded successfully',Uploaded_Banners });
            }).catch(error => {
                return res.status(500).json({ msg: error.message })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })

    }
}

export const Get_Banners = async (req, res) => {
    try {
        const banners = await Banners.find()
        return res.json(banners)
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}
