import express from "express";
import {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
} from "../controller/ArtistCategoryListController.js";

const router = express.Router();

router.post("/", createArtist);
router.get("/", getArtists);
router.get("/:id", getArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

export default router;