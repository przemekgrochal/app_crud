import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const authController = new AuthController();
const userController = new UserController();

const router = Router();
//Login route
// router.post("/login", AuthController.login);

//Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);

//Register route
router.post("/", authController.register, userController.createNewUser);

export default router;