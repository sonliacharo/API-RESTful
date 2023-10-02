import { findUserByEmail } from '../repositories/userRepository.js'
import { generateToken } from '../utils/encryptPassword.js'

const login = async (req, res) => {
  const { email } = req.body
  const userData = await findUserByEmail(email)
  
  if(!userData){
    return res.status(404).json("Usuário não encontrado.");
  }

  const { id } = userData
  const optionsPayload = { expiresIn: "8h"}
  const token = generateToken({ id }, optionsPayload)
  delete userData.senha
  
  return res.status(200).json({userData, token})
}

export default login