import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/route.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/", routes);

// Database connection
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

if (!PORT || !MONGOURL || !process.env.SECRET_KEY) {
  console.error("Missing required environment variables. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port :${PORT}`);
    });
  })
  .catch((error) => console.log(error));