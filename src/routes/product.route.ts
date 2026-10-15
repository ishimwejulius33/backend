import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productcontrollers";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import upload from "../middlewares/upload";

const router = Router();

router.get("/", getAllProducts);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  updateProduct
);

router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

export default router;