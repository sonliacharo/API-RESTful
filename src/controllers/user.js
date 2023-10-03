import pool from "../database/pdv.js";
import { encryptPassword } from "../utils/encryptPassword.js";
import handleServerError from "../utils/serverError.js";

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const encryptedPassword = await encryptPassword(senha);

    const newUser = await pool.query(
      `insert into usuarios (nome, email, senha) 
        values ($1, $2, $3) returning id, nome, email`,
      [nome, email, encryptedPassword]
    );

    return res.status(201).json(newUser.rows[0]);
  } catch (error) {
    return handleServerError(res);
  }
};

const getProfile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return handleServerError(res);
  }
};

export { registerUser, getProfile };
