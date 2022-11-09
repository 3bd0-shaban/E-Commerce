import axios from 'axios'
import getError from '../../Components/utile';
import { UserAction } from './../Slices/UserSlice';
import { AllUsersAction } from './../Slices/AllUsers';

export const SignIn = (email, password, navigate) => async (dispatch) => {
    try {

        const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password }, { withCredentials: true });
        localStorage.setItem('Logged?', true)
        dispatch(UserAction.LoggedIn(res.data));
        dispatch(UserAction.AccessToken(res.data.token));
        navigate('/');
    } catch (error) {
        dispatch(UserAction.Failed_LogIn(getError(error)));
    }

}

export const SignUp = (email, password, username, lastname, firstname, confirmpassword, navigate) => async (dispatch) => {
    try {
        const config = {
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        };
        const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password, username, lastname, firstname, confirmpassword }, config);
        dispatch(UserAction.Register(res.data));
        navigate('/signin');
    } catch (error) {
        dispatch(UserAction.Failed_LogIn(getError(error)));
    }
};

export const FetchAllUsers = () => async (dispatch) => {
    try {
        dispatch(AllUsersAction.Fetch_getAllUsers());
        const Users = await axios.get('http://localhost:5000/api/auth/users');
        dispatch(AllUsersAction.getAllUsers(Users.data));
    } catch (error) {
        dispatch(AllUsersAction.Fail_getAllUsers(getError(error)))
    }
};

export const Delete_User = (id) => async (dispatch) => {
    try {
        dispatch(AllUsersAction.Delete_User_Request());
        const Users = await axios.delete(`http://localhost:5000/api/auth/deleteuser/${id}`);
        dispatch(AllUsersAction.Delete_User_Success(Users.data));
    } catch (error) {
        dispatch(AllUsersAction.Delete_User_Fails(getError(error)));
    }
}
