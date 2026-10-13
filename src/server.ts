import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
import pool from "./config/db";

const PORT = Number(process.env.PORT) || 7000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

pool.query("SELECT NOW()")
  .then((result) => {
    console.log("PostgreSQL connected:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
