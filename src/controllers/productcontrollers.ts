import express from "express";
import { productModel } from "../models/product";

export const getAllProducts = async(req:express.Request, res:express.Response) =>{
    try{
        const products = await productModel.find();
        if(!products){
            return res.status(404).json({message:"No products found"});
        }
        return res.status(200).json({message:"Products recieved", products});
    }catch(e){
        return res.status(500).json({message:"Error occurred while fetching products"});
    }
}

export const createProduct = async(req:express.Request, res:express.Response) =>{
    try{

        const {name,description,price,category} = req.body;
        const newProduct = new productModel({name,description,price,category});
        await newProduct.save();
        return res.status(201).json({message:"Product created successfully", product:newProduct});
    }catch(e){
        return res.status(500).json({message:"Error occurred while fetching products"});
    }
}

export const deleteProduct = async(req:express.Request, res:express.Response) =>{
    try{
    
        return res.status(201).json({message:"Product deleted successfully"});
    }catch(e){
        return res.status(500).json({message:"Error while deleting products"});
    }
}

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const product = await productModel.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
    });
  }
};

