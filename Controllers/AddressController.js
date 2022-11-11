import Users from '../Models/Users.js';
export const SetNewAddress = async (req, res) => {
    try {
        let UserAddress = await Users.findOne({ _id: req.user._id });
        if (UserAddress.address.length < 1) {
            const updated_address = await Users.findByIdAndUpdate({ _id: req.user._id }, { address: req.body }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            return res.status(201).json({ updated_address });
        } else {
            const updated_address = await Users.findByIdAndUpdate({ _id: req.user._id }, {
                $push: {
                    address: req.body
                },
            }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            return res.status(201).json({ msg: 'added', updated_address });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error.message });
    }
}

export const Delete_All_Address = async (req, res) => {
    try {
        await Users.findByIdAndUpdate({ _id: req.user._id }, {
            $unset: {
                address: req.user
            }
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.status(201).json({ msg: 'All Address deleted successfully' });
    } catch (error) {
        res.status(204).json({ msg: error.message });
    }
};
export const Delete_Spacific_Address = async (req, res) => {
    try {
        const { _id } = req.body;
        let user = await Users.findOne({ _id: req.user._id });
        let AddressId = user.address.find(p => p._id == _id);
        await Users.findOneAndUpdate({ _id: req.user._id, AddressId: req.body._id }, {
            $pull: {
                address: req.body._id
            }
        }, { new: true, });
        return res.status(201).json({ msg: ' Address deleted ' });
    } catch (error) {
        res.status(204).json({ msg: error.message });
    }
};