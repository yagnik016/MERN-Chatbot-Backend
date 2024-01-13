import express from "express";
const UserRoutes = express.Router();

import {
  getUser,
  createUser,
  loginUser,
} from "../Controllers/User-Controller.js";

UserRoutes.get("/", getUser);
UserRoutes.post("/create", createUser);
UserRoutes.post("/login", loginUser);

export default UserRoutes;
