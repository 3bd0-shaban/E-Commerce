import Users from '../Models/Users.js';
import Address from '../Models/Address.js';
export const SetNewAddress = async (req, res) => {

    const { city, state, country, zipCode, isDefault, UserId } = req.body
    // let Address = [...req.body.address];
    // const ID = address._id
    try {
        let user = await Users.findOne({ address: { city } });
        if (user) {
            let itemIndex = user.address.findIndex(p => p.city == city);
            if (itemIndex) {
                user.address.push({ city, state, country, zipCode });

            }
            const Address_Added = await user.save();
            return res.status(201).json({ msg: 'Address Addedd Succeessfully', Address_Added });
        } else {
            const NewAddress = await Users.create({
                address: [{ city, state, country, zipCode }]
            });

            return res.status(201).json({ msg: 'Added to user', NewAddress });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error.message });
    }
}
