import { findUserByEmail } from '../repositories/userRepository.js'

export const validateEmail = async (req, res, next) => {
  const { email } = req.body
  const user = await findUserByEmail(email)

  if (user) {
    return res.status(400).json('Email inválido ou já foi utilizado.')
  }

  next()
}

export const validateDataRequest = (req, res, next) => {
  const accountData = req.body
  const emptyAttributes = Object.keys(accountData)
    .filter((key) => !accountData[key])
    .join(", ")

  if (emptyAttributes) {
    return res.status(400).json(`${emptyAttributes} contém informações inválidas.`)
  }

  next()
}

export const validateRequiredProperties = (requiredProperties) => {
  return (req, res, next) => {
    const accountData = req.body

    for (const prop of requiredProperties) {
      if (!accountData.hasOwnProperty(prop)) {
        return res.status(400).json(`${prop} não foi fornecido no corpo da requisição.`)
      }
    }

    next()
  }
}
