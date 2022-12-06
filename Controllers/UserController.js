import Users from '../Models/Users.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
import send_Email from './sendEmail.js';
const { Client_URL } = process.env
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

export const SignUp = async (req, res) => {
    const { email, password, confirmpassword, firstname, lastname } = req.body;
    try {
        if (!email || !password || !confirmpassword || !firstname || !lastname) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        if (password.lenght <= 6) {
            return res.status(400).json({ msg: 'Password must be more than 6 characters' });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ msg: 'Password does not match' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email already registered' });
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
                    return res.status(200).json({ msg: 'Account Created successfully' });
                })
                .catch(err => {
                    return res.status(400).json({ msg: err.message });
                })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid Email' });
        } else {
            const user = await Users.findOne({ email }).select('+password');
            if (!user) {
                return res.status(400).json({ msg: 'wrong Email' });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({ msg: 'wrong Password' });
                }
            }
            const token = createToken({ id: user._id })
            res.cookie('token', token, {
                httpOnly: true,
                path: '/',
                // secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 30 seconds
                sameSite: 'lax'
            })
            if (user) {
                const auth = await Users.find({ email }).select('-password');
                return res.status(200).json({ msg: 'successfully Logged In', auth });
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const RefreshToken = (req, res, next) => {
    const UserId = req.id;
    try {
        const cookie = req.headers.cookie;
        if (!cookie) {
            return res.status(500).json({ msg: 'Sign In First' });
        }
        const oldtoken = cookie.split("=")[1];
        if (!oldtoken) {
            return res.status(500).json({ msg: 'No Token Found' });
        }
        Jwt.verify(oldtoken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ msg: 'Failed Authorization,Please Log in again' });
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
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
export const UserInfo = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(400).json({ msg: 'User Not Founded' });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Get_UserInfo = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: 'User Not Founded' });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Update_UserInfo = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: 'User Not Founded with this Id' });
        } else {
            const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            return res.json(user);

        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Update_UserRole = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: 'User Not Founded with this Id' });
        } else {
            const user = await Users.findByIdAndUpdate(req.params.id, req.body.isAdmin, {   //{$set :{isAdmin:true}}
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            return res.json(user);

        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_UserInfo = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: 'User Not Founded with this Id' });
        } else {
            await Users.deleteOne({ _id: req.params.id });
            return res.status(200).json({ msg: 'User deleted successfully' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const logout = (req, res) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "You are not logged in" });
    }
    Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(400).json({ msg: 'Failed Authorization' });
                }
                res.clearCookie(`${user.id}`);
                req.cookies[`${user.id}`] = "";
                return res.status(200).json({ msg: "Successfully Logged Out" });
            })
        }
    });
};

export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Please Enter Valid Email' });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }
        const access_Token = createAccessToken({ id: user._id });
        const url = `${Client_URL}` / user / `${access_Token}`;
        send_Email(email, url, "reset Your Password");
        res.status(200).json({ msg: 'Email Send Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
export const ResetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const slat = await bcrypt.genSalt();
        const HashedPassword = await bcrypt.hash(password, slat);
        await Users.findByIdAndUpdate({ _id: req.user.id });
        password: HashedPassword;
        res.status(200).json({ msg: 'Password Cahnged Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const AllUsers = async (req, res) => {
    try {
        const user = await Users.find().select('-password');
        res.json(user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const LogOut = async (req, res) => {
    try {
        res.clearCookie('token', { path: '/', })
        res.json({ msg: 'Loged Out' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
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

