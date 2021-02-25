import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const authController = new AuthController();
const userController = new UserController();

const router = Router();
//Login route
router.post("/", authController.login);

export default router;