import { findUserByEmail, findUserByID } from '../repositories/userRepository.js'
import { checkEncrypt, validateAndGetTokenData } from '../utils/encryptPassword.js'

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token não informado ou inválido.' })
  }

  try {
    const { id } = validateAndGetTokenData(token)
    req.user = await findUserByID(id)
  } catch (err) {
    return res.status(401).json({ message: 'Acesso não autorizado.' })
  }

  next()
}

export const validateLoginData = async (req, res, next) => {
  const { email, senha } = req.body
  const userData = await findUserByEmail(email)
  const isValidEncrypt = await checkEncrypt(userData?.senha, senha)

  if (!isValidEncrypt) {
    return res.status(401).json({ message: 'Acesso não autorizado.' })
  }

  next()
}
