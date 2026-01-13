import Gig from "../models/Gig.js";
import { isValidTitle, isValidDescription, isValidBudget } from "../utils/validators.js";

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidTitle(title)) {
      return res.status(400).json({ message: "Title must be 3-100 characters" });
    }

    if (!isValidDescription(description)) {
      return res.status(400).json({ message: "Description must be 10-2000 characters" });
    }

    if (!isValidBudget(budget)) {
      return res.status(400).json({ message: "Budget must be a positive number" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      owner: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error("Create gig error:", error);
    res.status(500).json({ message: "Failed to create gig" });
  }
};


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

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    
    if (gig.status === "assigned") {
      return res
        .status(400)
        .json({ message: "Cannot delete an assigned gig" });
    }

    await gig.deleteOne();
    res.json({ message: "Gig deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

