import mongoose from "mongoose";

const artMarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  }
});

export default mongoose.model("ArtMarket", artMarketSchema);