import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import artMarketRoutes from "./routes/ArtMarketRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.resolve("uploads")));

// ArtMarket API routes
app.use("/api/artMarket", artMarketRoutes);

const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

if (!PORT || !MONGOURL) {
  console.error("Missing env vars. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));