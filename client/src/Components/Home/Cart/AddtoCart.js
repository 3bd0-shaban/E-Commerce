import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CartActions } from '../../../Redux/Slices/CartSlice';
import { getError } from '../../Exports';



export const AddtoCart = async (event) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    event.preventDefault();
    const userID = user._id
    try {
        const config = {
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        };
        dispatch(CartActions.Addtocart_Request());
        const res = await axios.post('/api/cart/new', { userID }, config);
        dispatch(CartActions.Addtocart_Success(res.data));
    } catch (error) {
        dispatch(CartActions.Addtocart_Fails(getError(error)));
    }
}

