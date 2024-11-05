import { Router } from "express";
import authController from "../controllers/authController";
const router = Router();
const AuthController = new authController();

import { refreshAccessToken, protect } from "../middleware/authMiddleware";
router.post("/user/refresh-token", refreshAccessToken);
router.get("/user", protect, AuthController.userAuth.bind(AuthController));
export const authRoutes = router;
