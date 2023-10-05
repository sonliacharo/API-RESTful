import { Router } from 'express'
import { registerUser, getProfile } from '../controllers/user.js'
import { getCategories } from '../controllers/categories.js'
import editProfile from '../controllers/editProfile.js'
import validateRegistration from '../middlewares/validateRegistration.js'
import { validateLoginData, validateToken } from '../middlewares/authMiddlewares.js'
import { validateDataRequest, validateRequiredProperties } from '../middlewares/userValidators.js'
import login from '../controllers/loginController.js'

import validateEditProfile from '../middlewares/validateEditProfile.js'
import { checkIdProduct } from '../middlewares/product/productMiddlewares.js'
import { deleteProduct } from '../controllers/product/productControlers.js'

export const router = Router()

const requiredAccountProperties = ['email', 'senha']

router.get('/categoria', getCategories)
router.post('/usuario', validateRegistration, registerUser)

router.post(
  '/login',
  validateRequiredProperties(requiredAccountProperties),
  validateDataRequest,
  validateLoginData,
  login
);

//Rotas protegidas
router.use(validateToken)

//usuário
router.get("/usuario", getProfile)
router.put("/usuario", validateEditProfile, editProfile)

//produtos
router.delete("/produto/:id", checkIdProduct, deleteProduct)