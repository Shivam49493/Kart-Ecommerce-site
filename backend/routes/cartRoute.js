import express from 'express';
import { addToCart, getUserCart, UpdateCart} from '../controllers/cartController.js';
import isAuth from '../middleware/isAuth.js';

const cartrouter = express.Router();
cartrouter.post('/get', isAuth,getUserCart );
cartrouter.post('/add', isAuth, addToCart);
cartrouter.post('/update', isAuth,UpdateCart);
export default cartrouter;