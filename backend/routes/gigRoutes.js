import express from "express";
import {
  createGig,
  getGigs,
  searchGigs,
  getGigById,
} from "../controllers/gigController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createGig);
router.get("/", getGigs);
router.get("/search", searchGigs);
router.get("/:id", getGigById);

export default router;
