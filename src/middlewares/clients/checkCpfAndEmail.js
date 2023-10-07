import { checkCPFInUse, checkEmailInUse } from "../../repositories/clientRepository.js";

export const checkCpfAndEmail = async (req, res, next) => {
  const { email, cpf } = req.body;
  const { id } = req.params || 0;
  
  if(await checkEmailInUse(email, id)){
    return res.status(403).json({ message: "O e-mail informado já está em uso por outro cliente" });
  }

  if (await checkCPFInUse(cpf, id)) {
    return res.status(403).json({ message: "O CPF informado já está em uso por outro cliente" });
  }

  next();
}