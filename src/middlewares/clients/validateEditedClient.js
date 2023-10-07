import { findClienttByID } from "../../repositories/clientRepository.js";

const validateEditedClient = async (req, res, next) => {
  const { nome, email, cpf } = req.body;

  try {
    const { id } = req.params;
    const client = await findClienttByID(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    if (!nome || !email || !cpf) {
      return res
        .status(400)
        .json({ message: "Informe o nome, cpf e e-mail do cliente" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

export default validateEditedClient;
