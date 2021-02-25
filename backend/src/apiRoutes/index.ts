import { Router, Request, Response } from "express";
import user from "./user";

const routes = Router();

routes.use("/user", user);

export default routes;
