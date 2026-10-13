import express from "express";
import { getAllProducts } from "../controllers/productcontrollers";
import { createProduct } from "../controllers/productcontrollers";
import { updateProduct } from "../controllers/productcontrollers";
import { deleteProduct } from "../controllers/productcontrollers";
const router = express.Router();


router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;