import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import prod from "./routes/product.route"

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", prod);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

export default app;
