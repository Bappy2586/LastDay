import ArtMarket from "../model/ArtMarketModel.js";

// Create Artist Category
export const createArt = async (req, res) => {
  try {
    const { email } = req.body;
    if (await ArtMarket.findOne({ email })) {
      return res.status(400).json({ message: "Art already exists." });
    }
    const art = new ArtMarket(req.body);
    await art.save();
    res.status(201).json(art);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all
export const getArts = async (req, res) => {
  try {
    const arts = await ArtMarket.find();
    res.json(arts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one
export const getArt = async (req, res) => {
  try {
    const art = await ArtMarket.findById(req.params.id);
    if (!art) return res.status(404).json({ message: "Not found" });
    res.json(art);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateArt = async (req, res) => {
  try {
    const art = await ArtMarket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!art) return res.status(404).json({ message: "Not found" });
    res.json(art);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
export const deleteArt = async (req, res) => {
  try {
    const art = await ArtMarket.findByIdAndDelete(req.params.id);
    if (!art) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};