import express from "express";
import { productModel } from "../models/product";
import cloudinary from "../config/cloudinary";
import type { UploadApiResponse } from "cloudinary";

function uploadImage(buffer: Buffer): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "novatech-products" },
      (error: Error | undefined, result: import("cloudinary").UploadApiResponse | undefined) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Image upload failed"));
        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await productModel.find();
    return res.status(200).json({ message: "Products retrieved", products });
  } catch {
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({ message: "All product fields are required" });
    }

    let image = "";

    if (req.file) {
      const uploaded = await uploadImage(req.file.buffer);
      image = uploaded.secure_url;
    }

    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      image
    });

    return res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const updates: Record<string, unknown> = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = Number(price);
    if (category !== undefined) updates.category = category;

    if (req.file) {
      const uploaded = await uploadImage(req.file.buffer);
      updates.image = uploaded.secure_url;
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({ message: "Error deleting product" });
  }
};