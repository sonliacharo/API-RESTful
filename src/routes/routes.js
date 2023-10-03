import { Router } from 'express'
import { registerUser, getProfile } from '../controllers/user.js'
import { getCategories } from '../controllers/categories.js'
import { editProfile } from "../controllers/editProfile.js";
import validateRegistration from '../middlewares/validateRegistration.js'
import validateLoginData from '../middlewares/authMiddlewares.js'
import { validateDataRequest, validateRequiredProperties } from '../middlewares/userValidators.js'
import login from '../controllers/loginController.js'

import validateRegistration from "../middlewares/validateRegistration.js";
import loginVerification from "../middlewares/loginVerification.js";
import validateEditProfile from "../middlewares/validateEditProfile.js";

export const router = Router()

const requiredAccountProperties = ['email', 'senha']


router.get("/categoria", getCategories);

router.post("/usuario", validateRegistration, registerUser);

router.post('/login', validateRequiredProperties(requiredAccountProperties), validateDataRequest, validateLoginData, login)

router.use(loginVerification);

router.get("/usuario", getProfile);

router.put("/usuario", validateEditProfile, editProfile);
