import { findUserByEmail } from '../repositories/userRepository.js'
import { checkEncrypt } from '../utils/encryptPassword.js';

const validateLoginData = async (req, res, next) => {
  const { email, senha } = req.body
  const userData = await findUserByEmail(email)
  const isValidEncrypt = await checkEncrypt(userData?.senha, senha)

  if (!isValidEncrypt) {
    return res.status(401).json('Acesso não autorizado.')
  }

  next()
};

export default validateLoginData