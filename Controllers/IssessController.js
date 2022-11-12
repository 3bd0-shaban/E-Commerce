import Issess from "../Models/Issess.js";

export const Send_Issess_Report = async (req, res) => {
    try {
        const { content } = req.body
        if (!content) return res.status(200).json({ msg: 'Please type you issess before sending' });
        await new Issess({
            user: req.user._id, content
        }).save()
            .then((sendedReport) => {
                return res.json(sendedReport);
            }).catch((error) => {
                return res.status(500).json({ msg: error.message })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_Issess_Report = async (req, res) => {
    try {
        const issess = await Issess.find().populate('user', 'firstname lastname avatar');
        return res.json(issess);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_Issess_Report = async (req, res) => {
    try {
        const issess = await Issess.findById(req.params.id);
        if (!issess) {
            return res.status(400).json({ msg: 'ropert Not Founded with this Id' });
        } else {
            await Issess.deleteOne({ _id: req.params.id });
            return res.status(200).json({ msg: 'Report deleted successfully' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}
