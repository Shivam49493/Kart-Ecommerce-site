import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

import dotenv from "dotenv";
import razorpay from "razorpay";
dotenv.config();


export const placeOrder = async (req, res) => {
  try {
    let { userId, items, amount, address } = req.body;
    const orderData = new Order({
        items,
        amount,
        userId,
        address,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
    });
    const newOrder = await orderData.save();
    res.status(201).json(newOrder);
    await User.findByIdAndUpdate(userId,  { cart: {}  });

} catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ message: "Internal server error" });
}
}

export const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const placeRazorpayOrder = async (req, res) => {
    try {
        let { userId, items, amount, address } = req.body;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: newOrder._id.toString(),
        };  

        // Use either async/await OR callback, not both
        const razorpayOrder = await razorpayInstance.orders.create(options);
        
        res.status(200).json({ 
            orderId: razorpayOrder.id, 
            amount: razorpayOrder.amount, 
            currency: razorpayOrder.currency,
            receipt: razorpayOrder.receipt
        });

    } catch (error) {
        console.error("Error in placeRazorpayOrder:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId });
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error in userOrders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const verfiyPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const userId = req.userId;
        const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    
        
        if (orderinfo.status === "paid") {
            // Correct: Use an object for the filter parameter
            await Order.findOneAndUpdate(
                { _id: orderinfo.receipt }, // Filter object
                { payment: true } // Update object
            );
            
            await User.findByIdAndUpdate(userId, { cart: {} });
            return res.status(200).json({ message: "Payment verified and order placed successfully" });
        } else {
            return res.status(400).json({ message: "Payment not successful" });
        }
    } catch (error) {
        console.error("Error in verfiyPayment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 