import express from "express";
const router = express.Router();

//get controllers
import {
  registerUser,
  loginUser,
  verifyEmailToken,
  googleSignup,
  updatePersonalUserInfo,
  updateProfilePicture,
} from "../controllers/userController";

//get middlewares
import { protect } from "../middlewares/authMiddleware";

// Use controllers and middleware
router.post("/register", registerUser);
router.post("/authenticate", loginUser);
router.get("/:id/verify/:token", verifyEmailToken);
router.post("/googleSignup", googleSignup);
router.put("/updatePersonalUserInfo", protect, updatePersonalUserInfo);
router.put("/updateProfilePicture", protect, updateProfilePicture);

export default router;
