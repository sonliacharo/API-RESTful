import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10)
};

export const checkEncrypt = async (encryptPassword = '', password = '') => {
  return await bcrypt.compare(password, encryptPassword)
};

export const generateToken = (payload, options) => {
  return jwt.sign(payload, process.env.JWT_PASSWORD, options)
};

export const validateAndGetTokenData = (token) => {
  return jwt.verify(token, process.env.JWT_PASSWORD)
};
