import Users from '../Models/Users.js';
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
import send_Email from './sendEmail.js';
const { Client_URL } = process.env
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

export const SignUp = asyncHandler(async (req, res, next) => {
    const { email, password, confirmpassword, firstname, lastname } = req.body;
    if (!email || !password || !confirmpassword || !firstname || !lastname) {
        return next(new ErrorHandler('Please Fill All Fields', 400));
    }
    if (password.lenght <= 6) {
        return next(new ErrorHandler('Passowrd must be more than 6 characters', 400));
    }
    if (password !== confirmpassword) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }
    if (!validateEmail(email)) {
        return next(new ErrorHandler('Invalid Email', 400));
    }
    const user = await Users.findOne({ email });
    if (user) {
        return next(new ErrorHandler('Email Already Registered', 400));
    } else {
        const slat = await bcrypt.genSalt();
        const HashedPassword = await bcrypt.hash(password, slat)
        // const token = createActivationToken(newuser)


        // const url = `${Client_URL}` / user / `${token}`;
        // send_Email(email, url);
        // return res.status(200).json({ msg: 'Account Created successfully , Please activate your acount', newuser, token });

        new Users({
            email, password: HashedPassword, firstname, lastname
        }).save()
            .then(newuser => {
                return res.json({ msg: 'Account Created successfully' });
            })
            .catch(err => {
                return res.status(400).json({ msg: err.message });
            })
    }
})

export const SignIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Please Fill All Fields', 400));
    }
    if (!validateEmail(email)) {
        return next(new ErrorHandler('Invalid Email', 400));
    } else {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: 'wrong Email' });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return next(new ErrorHandler('Invalid Email Or Password', 400));;
            }
        }
        const token = createToken({ id: user._id })
        res.cookie('token', token, {
            httpOnly: true,
            path: '/',
            // secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1d
            sameSite: 'lax'
        });
        if (user) {
            const auth = await Users.find({ email }).select('-password');
            res.cookie('Logged_in', String(user._id), {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1d
                sameSite: 'lax'
            });
            if (user.isAdmin) {
                res.cookie('Admin', String(user._id), {
                    path: '/',
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1d
                    sameSite: 'lax'
                });
            }
            return res.json({ msg: 'successfully Logged In', auth, token });
        }
    }
})
export const RefreshToken = asyncHandler((req, res, next) => {
    const UserId = req.id;
    const cookie = req.headers.cookie;
    if (!cookie) {
        return next(new ErrorHandler('Sign In First', 400));
    }
    const oldtoken = cookie.split("=")[1];
    if (!oldtoken) {
        return next(new ErrorHandler('No Token Founded', 400));
    }
    Jwt.verify(oldtoken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(new ErrorHandler('Authorization Failed, Please Log In Again', 400));
        }
        // res.clearCookie(`${user.id}`);
        // // req.cookie[`${user.id}`] = '';
        // const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "5s", });
        // res.cookie(String(user.id), token, {
        //     httpOnly: true,
        //     path: '/',
        //     secure: true,
        //     expires: new Date(Date.now() + 1000 * 5), // 30 seconds
        //     // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //     sameSite: 'lax'
        // })
        req.id = user.id
        next();
    });
})
export const UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.find({ _id: req.user._id });
    if (!user) {
        return next(new ErrorHandler('User Not Founded', 400));
    }
    res.json(user);
})
export const Get_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded', 400));
    }
    res.json(user);
})
export const Update_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.json(user);
    }
})
export const Update_UserRole = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body.isAdmin, {   //{$set :{isAdmin:true}}
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.json({ msg: 'User Updated Successfully', user });
    }
})
export const Delete_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        await Users.deleteOne({ _id: req.params.id });
        return res.json({ msg: 'User deleted successfully' });
    }
})
export const logout = asyncHandler((req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return next(new ErrorHandler('You Are Not Logged In', 400));
    }
    Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return next(new ErrorHandler('Authorization Failed, Please Log In Again', 400));
                }
                res.clearCookie(`${user.id}`);
                req.cookies[`${user.id}`] = "";
                return res.json({ msg: "Successfully Logged Out" });
            })
        }
    });
})

export const ForgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler('Please Enter Vailed Email', 400));
    }
    const user = await Users.findOne({ email });
    if (!user) {
        return next(new ErrorHandler('Invailed Email', 400));
    }
    const access_Token = createAccessToken({ id: user._id });
    const url = `${Client_URL}` / user / `${access_Token}`;
    send_Email(email, url, "reset Your Password");
    return res.json({ msg: 'Email Send Successfully' });
})
export const ResetPassword = asyncHandler(async (req, res, next) => {
    const { password } = req.body;
    const slat = await bcrypt.genSalt();
    const HashedPassword = await bcrypt.hash(password, slat);
    await Users.findByIdAndUpdate({ _id: req.user.id });
    password: HashedPassword;
    return res.json({ msg: 'Password Cahnged Successfully' });
})
export const AllUsers = asyncHandler(async (req, res, next) => {
    const user = await Users.find().select('-password');
    return res.json(user);
})
export const LogOut = asyncHandler(async (req, res, next) => {
    res.clearCookie('token', { path: '/' });
    res.clearCookie('Logged_in', { path: '/' });
    res.clearCookie('Admin', { path: '/' });
    return res.json({ msg: 'Loged Out' });
})
function validateEmail(email) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}
const createToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
}
const createAccessToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SCCESS, { expiresIn: '15m' })
}
const createRefreshToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '7d' })
}

