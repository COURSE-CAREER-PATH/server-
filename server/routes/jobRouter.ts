import express from "express";
const router = express.Router();

//get controllers
import { postJobs, getAllJobs , getJobsByCourse } from "../controllers/jobsController";

//get middlewares
import { protect } from "../middlewares/authMiddleware";

// Use controllers and middleware
router.post("/post", protect, postJobs);
router.get("/allJobs", protect, getAllJobs);
router.get("/courseJobs", protect, getJobsByCourse);

export default router;
