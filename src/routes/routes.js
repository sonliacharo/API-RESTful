import { Router } from "express";

import { registerUser } from "../controllers/user.js";
import { getCategories } from "../controllers/categories.js";

import validateRegistration from "../middlewares/validateRegistration.js";
import loginVerification from "../middlewares/loginVerification.js";

export const router = Router();

router.get("/categoria", getCategories);

router.post("/usuario", validateRegistration, registerUser);

router.use(loginVerification);
