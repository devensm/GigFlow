import express from "express";
import { placeBid, getBidsForGig } from "../controllers/bidController.js";
import protect from "../middleware/authMiddleware.js";
import { hireBid } from "../controllers/bidController.js";


const router = express.Router();

router.post("/", protect, placeBid);
router.get("/:gigId", protect, getBidsForGig);
router.patch("/:bidId/hire", protect, hireBid);


export default router;
