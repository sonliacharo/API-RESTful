import {
  findClienttByID,
  checkEmailInUse,
  checkCPFInUse,
} from "../../repositories/clientRepository.js";

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

    if (await checkEmailInUse(email)) {
      return res.status(403).json({
        message: "O e-mail informado já está em uso por outro usuário",
      });
    }

    if (await checkCPFInUse(cpf)) {
      return res.status(403).json({
        message: "O CPF informado já está em uso por outro usuário",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

export default validateEditedClient;
