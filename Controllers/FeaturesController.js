import Features from "../Models/Features.js";
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: 'abdo9',
    api_key: '464953298584214',
    api_secret: 'Sbv2ng6sVzLNNLLxA9T6rmvKdtU',
    secure: true
});


export const Upload_Banners = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'No files were uploaded.' })

        const file = req.files.file;
        // if (file.size > 1024 * 1024) {
        //     removeTmp(file.tempFilePath)
        //     return res.status(400).json({ msg: "Size too large" })
        // }

        // if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        //     // removeTmp(file.tempFilePath)
        //     return res.status(400).json({ msg: "File format is incorrect." })
        // }
        const banners = [];
        let bannersBuffer = [];
        for (let i = 0; i < banners.length; i++) {
            const result = await cloudinary.uploader.upload(file.tempFilePath[i], {
                folder: "Banners",
            });
            bannersBuffer.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.banners = bannersBuffer
        Features.create(req.body).then(Uploaded_Banners => {
            return res.status(200).json({
                msg: 'Product uploaded successfully', Uploaded_Banners
            });
        }).catch(error => {
            console.log(error)
            return res.status(500).json({ msg: error.message })
        })

        // new Features({
        //     banners: {
        //         public_id: result.public_id,
        //         url: result.secure_url,
        //     }
        // })
        //     .save()
        //     .then(Uploaded_Banners => {
        //         return res.status(200).json({
        //             msg: 'Product uploaded successfully', Uploaded_Banners
        //         });
        //     }).catch(error => {
        //         console.log(error)

        //         return res.status(500).json({ msg: error.message })
        //     })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })

    }
}