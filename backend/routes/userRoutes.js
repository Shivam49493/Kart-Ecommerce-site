import express from "express";
import isAuth from "../middleware/isAuth.js";
import {getCurrentUser} from "../controllers/userController.js"

import { getAdmin } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.get("/getadmin", isAuth, getAdmin);
export default userRouter;