import express from "express";
import { SignUp, SignIn,VerifyToken, ForgotPassword, ResetPassword, UserInfo,AllUsers, LogOut, RefreshToken,logout } from '../Controllers/UserController.js'
import { auth,isAdmin } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/verifytoken', VerifyToken,UserInfo);
router.get('/refresh_token', VerifyToken,RefreshToken,UserInfo);
router.post("/logout", VerifyToken, logout);
router.post('/forgot', ForgotPassword);
router.post('/resetpassword:', ResetPassword);
router.get('/info', UserInfo);
router.get('/users', AllUsers);
export default router