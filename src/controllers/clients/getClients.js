import { findClients } from "../../repositories/clientRepository.js";
import handleServerError from "../../utils/serverError.js";

const getClients = async (req, res) => {
  try {
    const clients = await findClients();
    return res.status(200).json(clients);
  } catch (error) {
    return handleServerError(res);
  }
};

export default getClients;
