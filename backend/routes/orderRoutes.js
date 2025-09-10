import express from 'express'
import isAuth from '../middleware/isAuth.js'

import {placeOrder,placeRazorpayOrder} from '../controllers/orderController.js'
import {userOrders,verfiyPayment} from '../controllers/orderController.js'


const orderRoutes= express.Router()
orderRoutes.post('/placeorder',isAuth,placeOrder)
orderRoutes.post('/userorders',isAuth,userOrders)
orderRoutes.post('/payorderbyrazorpay',isAuth,placeRazorpayOrder)
orderRoutes.post('/verifypayment',isAuth,verfiyPayment)
export default orderRoutes