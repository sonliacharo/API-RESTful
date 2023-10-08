import { createCustomer } from "../../repositories/customerRepository.js";

export const registerCustomer = async (req, res) => {
  const { nome, email, cpf } = req.body;

  try {
    createCustomer({ nome, email, cpf });
    return res.status(201).json({ message: "cliente criado com sucesso." });
  }catch(err) {
    return res.status(500).json({ message: "erro interno no servidor." });
  }

}

export default registerCustomer;


