import { Router, Request, Response } from "express";
import register from "./register";
import login from "./login";

const routes = Router();

routes.use("/register", register);
routes.use("/login", login);

export default routes;
