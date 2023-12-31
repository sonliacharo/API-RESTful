import { Router } from "express";
import registerUser from "../controllers/user/registerUser.js";
import getProfile from "../controllers/user/getProfile.js";
import { getCategories } from "../controllers/categories/categories.js";
import editProfile from "../controllers/user/editProfile.js";
import validateRegistration from "../middlewares/validateRegistration.js";
import { validateLoginData, validateToken } from "../middlewares/authMiddlewares.js";
import { validateDataRequest, validateRequiredProperties } from "../middlewares/userValidators.js";
import login from "../controllers/user/loginController.js";

import validateEditProfile from "../middlewares/validateEditProfile.js";
import { checkIdProduct } from "../middlewares/product/productMiddlewares.js";
import { deleteProduct, editProduct, registerProduct } from "../controllers/product/productControlers.js";
import getClients from "../controllers/clients/getClients.js";
import validateEditedClient from "../middlewares/clients/validateEditedClient.js";
import { editClient } from "../controllers/clients/editClient.js";
import { checkCpfAndEmail } from "../middlewares/clients/checkCpfAndEmail.js";
import registerCustomer from "../controllers/clients/registerCustomer.js";
import listProducts from "../controllers/product/listProducts.js";
import listProduct from "../controllers/product/listProduct.js";
import { registerOrder } from "../controllers/requests/registerOrder.js";

export const router = Router()

const requiredAccountProperties = ["email", "senha"];

router.get("/categoria", getCategories);
router.post("/usuario", validateRegistration, registerUser);

router.post(
  "/login",
  validateRequiredProperties(requiredAccountProperties),
  validateDataRequest,
  validateLoginData,
  login
);

//Rotas protegidas
router.use(validateToken);

//usuário
router.get("/usuario", getProfile);
router.put("/usuario", validateEditProfile, editProfile);

//produtos

router.get("/produto", listProducts)
router.get("/produto/:id", listProduct)
router.post('/produto', registerProduct)
router.put('/produto:id', editProduct)
router.delete("/produto/:id", checkIdProduct, deleteProduct)

//Pedidos
router.post("/pedido", registerOrder);

//clientes
router.get("/cliente", getClients);

//Middleware responsável por verificar se CPF e Email são únicos
router.use(checkCpfAndEmail);

router.post(
  "/cliente",
  validateRequiredProperties(["nome", "email", "cpf"]),
  validateDataRequest,
  registerCustomer
);
router.put("/cliente/:id", validateEditedClient, editClient);

