require('dotenv').config();
import errorHandler from "errorhandler";
import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import apiRoutes from "./apiRoutes/index";
import authRoutes from "./authRoutes/index";
import aplicationRoutes from "./aplicationRoutes/index";
import "reflect-metadata";

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(flash());

/**
 * API routes.
 */
app.use("/api", apiRoutes);

/**
 * Authorization routes.
 */
app.use("/auth", authRoutes);

/**
 * Aplication static files.
 */
app.use("/", express.static(path.resolve(__dirname,"../../frontend/build/")));

/**
 * Aplication routes.
 */
app.get("/*", function (req, res) {
    res.sendFile("index.html", { root: path.resolve(__dirname,"../../frontend/build/") });
});

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
app.listen(
    process.env.APP_PORT,
    () => {
    console.log(`App is running at http://localhost:${process.env.APP_PORT}`);
    console.log("  Press CTRL-C to stop\n");
});