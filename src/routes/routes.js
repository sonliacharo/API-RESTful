import { Router } from 'express'
import { registerUser } from '../controllers/user.js'
import { getCategories } from '../controllers/categories.js'
import validateRegistration from '../middlewares/validateRegistration.js'
import validateLoginData from '../middlewares/authMiddlewares.js'
import { validateDataRequest, validateRequiredProperties } from '../middlewares/userValidators.js'
import login from '../controllers/loginController.js'

export const router = Router()

const requiredAccountProperties = ['email', 'senha']

router.get('/categoria', getCategories)
router.post('/usuario', validateRegistration, registerUser)
router.post('/login', validateRequiredProperties(requiredAccountProperties), validateDataRequest, validateLoginData, login)
