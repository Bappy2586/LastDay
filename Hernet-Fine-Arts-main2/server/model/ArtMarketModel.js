import mongoose from "mongoose";

const artMarketSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  imgpath: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ArtMarket", artMarketSchema);