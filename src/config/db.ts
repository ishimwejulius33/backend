import mongoose from "mongoose";
import { Pool } from "pg";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
  max: 5,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error.message);
});

export default pool;