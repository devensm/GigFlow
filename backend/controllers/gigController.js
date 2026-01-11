import Gig from "../models/Gig.js";

// Create a new gig
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      owner: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all open gigs
export const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ status: "open" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search gigs by title
export const searchGigs = async (req, res) => {
  try {
    const { q } = req.query;

    const gigs = await Gig.find({
      title: { $regex: q, $options: "i" },
      status: "open",
    }).populate("owner", "name email");

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get gig by ID
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
