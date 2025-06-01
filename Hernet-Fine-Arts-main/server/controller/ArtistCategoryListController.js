import ArtistCategory from "../model/ArtistCategoryListModel.js";

// Create Artist Category
export const createArtist = async (req, res) => {
  try {
    const { email } = req.body;
    if (await ArtistCategory.findOne({ email })) {
      return res.status(400).json({ message: "Artist already exists." });
    }
    const artist = new ArtistCategory(req.body);
    await artist.save();
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all
export const getArtists = async (req, res) => {
  try {
    const artists = await ArtistCategory.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one
export const getArtist = async (req, res) => {
  try {
    const artist = await ArtistCategory.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: "Not found" });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateArtist = async (req, res) => {
  try {
    const artist = await ArtistCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!artist) return res.status(404).json({ message: "Not found" });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
export const deleteArtist = async (req, res) => {
  try {
    const artist = await ArtistCategory.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};