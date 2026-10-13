import mongoose, { Schema } from "mongoose";



const product = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
},{timestamps: true});

export const productModel = mongoose.model("products",product)