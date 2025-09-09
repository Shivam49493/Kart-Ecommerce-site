import express from 'express';
import {adminLogin,googlelogin, register,login,logout} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/googlelogin', googlelogin);
authRouter.post('/adminlogin', adminLogin);

export default authRouter;