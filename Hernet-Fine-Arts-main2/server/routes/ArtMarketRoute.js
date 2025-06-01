import express from "express";
import {
  createArtMarket,
  getArtsMarket,
  deleteArtMarket,
} from "../controller/ArtMarketController.js";

const router = express.Router();

router.post("/", createArtMarket);
router.get("/", getArtsMarket);
router.delete("/:id", deleteArtMarket);

export default router;