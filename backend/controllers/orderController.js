import User from "../models/userModel";
import Order from "../models/orderModel.js";


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

