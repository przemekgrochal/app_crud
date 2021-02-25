import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const userController = new UserController();
const authController = new AuthController();
const router = Router();

//Get all users
router.get("/", authController.authenticate, userController.getAllUser);

// Get one user
router.get( "/:id([0-9]+)", authController.authenticate, userController.getUserById);

//Create a new user
router.post("/", authController.authenticate, userController.createNewUser);

//Edit one user
router.patch("/:id([0-9]+)", authController.authenticate, userController.editUser);

//Delete one user
router.delete("/:id([0-9]+)", authController.authenticate, userController.deleteUser);

export default router;