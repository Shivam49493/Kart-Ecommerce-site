import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String },
    image4:{type:String},
    sizes: { type: Array, required: true },
    category:{type:String ,required:true},
    subCategory: { type: String, required: true },
    date: { type: Number, required: true },
    bestSellers: { type: Boolean, default: false }

},{ timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
