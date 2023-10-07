import { editClientById } from "../../repositories/clientRepository.js";
import handleServerError from "../../utils/serverError.js";

export const editClient = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf } = req.body;

  try {
    const newClient = await editClientById({ nome, email, cpf, id });
    return res.status(200).json(newClient);
  } catch (error) {
    return handleServerError(res);
  }
};
