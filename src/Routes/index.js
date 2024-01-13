import express  from "express";
const appRoutes = express.Router();
import UserRoutes from "./User-Routes.js";
import ChatRoutes from "./Chat-Routes.js";

appRoutes.use("/user", UserRoutes);
appRoutes.use("/chat", ChatRoutes);

export default appRoutes