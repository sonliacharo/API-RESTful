import pool from "../../database/pdv.js";
import { encryptPassword } from "../../utils/encryptPassword.js";
import handleServerError from "../../utils/serverError.js";

const editProfile = async (req, res) => {
  const userId = req.user.id;
  const { nome, senha } = req.body;

  try {
    const encryptedPassword = senha ? await encryptPassword(senha) : null;

    const updatedUser = await pool.query(
      `UPDATE usuarios SET nome = $1, senha = $2 WHERE id = $3 RETURNING id, nome, email`,
      [nome, encryptedPassword, userId]
    );

    return res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    return handleServerError(res);
  }
};

export default editProfile;
