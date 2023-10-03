import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10)
};

export const checkEncrypt = async (encryptPassword = '', password = '') => {
  return await bcrypt.compare(password, encryptPassword)
};

export const generateToken = (payload, options) => {
  return jwt.sign(payload, process.env.JWT_PASSWORD, options)
};
