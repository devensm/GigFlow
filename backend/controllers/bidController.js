import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { getIO, onlineUsers } from "../socket.js";
import { isValidMessage, isValidPrice } from "../utils/validators.js";


export const placeBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(gigId)) {
      return res.status(400).json({ message: "Invalid gig ID" });
    }

    if (!isValidMessage(message)) {
      return res.status(400).json({ message: "Message must be 5-1000 characters" });
    }

    if (!isValidPrice(price)) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.status !== "open") {
      return res.status(400).json({ message: "Gig is not open for bidding" });
    }

    if (gig.owner.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot bid on your own gig" });
    }

    const bid = await Bid.create({
      gig: gigId,
      freelancer: req.user._id,
      message,
      price,
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for owner of bid
export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // to see the bids
    if (gig.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gig: gigId })
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gig).session(session);
    if (!gig) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Gig not found" });
    }

  
    if (gig.owner.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Not authorized" });
    }

    // double hirring
    if (gig.status === "assigned") {
      await session.abortTransaction();
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // update gig
    gig.status = "assigned";
    await gig.save({ session });

    // changing the bid mark
    bid.status = "hired";
    await bid.save({ session });

  
    await Bid.updateMany(
      { gig: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // socket integration
    const freelancerId = bid.freelancer.toString();
    const socketId = onlineUsers.get(freelancerId);
    const io = getIO();

    console.log("HIRE TRIGGERED");
    console.log("Freelancer ID:", freelancerId);
    console.log("Socket ID:", socketId);

    if (socketId && io) {
      io.to(socketId).emit("hired", {
        message: `You have been hired for "${gig.title}"!`,
        gigId: gig._id,
      });

 
    } else {
      console.log(" No socket found for freelancer");
    }

    res.json({ message: "Freelancer hired successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};


// all bids for log user
export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancer: req.user._id })
      .populate("gig", "title budget status")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// bid update for user who are bidding
export const updateBid = async (req, res) => {
  try {
    const { message, price } = req.body;
    const bid = await Bid.findById(req.params.id);

    if (!bid) return res.status(404).json({ message: "Bid not found" });


    if (bid.freelancer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }


    if (bid.status !== "pending") {
      return res.status(400).json({ message: "Cannot edit this bid anymore" });
    }

    bid.message = message || bid.message;
    bid.price = price || bid.price;

    await bid.save();
    res.json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);

    if (!bid) return res.status(404).json({ message: "Bid not found" });


    if (bid.freelancer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }


    if (bid.status !== "pending") {
      return res.status(400).json({ message: "Cannot delete this bid anymore" });
    }

    await bid.deleteOne();
    res.json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
