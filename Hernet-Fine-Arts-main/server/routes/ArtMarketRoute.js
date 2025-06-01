import express from "express";
import {
  createArt,
  getArts,
  getArt,
  updateArt,
  deleteArt,
} from "../controller/ArtMarketController.js";

const router = express.Router();

router.post("/", createArt);
router.get("/", getArts);
router.get("/:id", getArt);
router.put("/:id", updateArt);
router.delete("/:id", deleteArt);

export default router;