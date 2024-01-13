import express from "express";
const UserRoutes = express.Router();
import { SignupValidator, Validate } from "../Utils/Validators.js";

import {
  getUser,
  createUser,
  loginUser,
} from "../Controllers/User-Controller.js";

UserRoutes.get("/", getUser);
UserRoutes.post("/register", Validate(SignupValidator), createUser);
UserRoutes.post("/login", loginUser);

export default UserRoutes;
