import ArtMarket from "../model/ArtMarketModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const isImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage, fileFilter: isImage });

export const createArtMarket = [
  upload.single("photo"),
  async (req, res) => {
    try {
      const { fname } = req.body;
      const file = req.file;

      if (!fname || !file) {
        return res.status(400).json({ status: 400, message: "Fill all the data" });
      }

      const art = new ArtMarket({
        fname,
        imgpath: file.filename,
        date: new Date()
      });

      const finalData = await art.save();
      res.status(201).json({ status: 201, finalData });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
];

export const getArtsMarket = async (req, res) => {
  try {
    const arts = await ArtMarket.find();
    res.status(200).json({ status: 200, getUser: arts });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const deleteArtMarket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArt = await ArtMarket.findByIdAndDelete(id);

    if (!deletedArt) {
      return res.status(404).json({ status: 404, message: "Art not found" });
    }

    const imgPath = path.join(uploadsDir, deletedArt.imgpath);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    res.status(200).json({ status: 200, dltUser: deletedArt });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};