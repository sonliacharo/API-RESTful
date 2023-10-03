import { Router } from "express";

import { registerUser, getProfile } from "../controllers/user.js";
import { getCategories } from "../controllers/categories.js";

import validateRegistration from "../middlewares/validateRegistration.js";
import loginVerification from "../middlewares/loginVerification.js";

import { editProfile } from "../controllers/editProfile.js";
import validateEditProfile from "../middlewares/validateEditProfile.js";

export const router = Router();

router.get("/categoria", getCategories);

router.post("/usuario", validateRegistration, registerUser);

router.use(loginVerification);

router.get("/usuario", getProfile);

router.put("/usuario", validateEditProfile, editProfile);
