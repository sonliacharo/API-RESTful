import jwt from "jsonwebtoken";
import jwtPassword from "../utils/jwtPassword.js";
import pool from "../database/pdv.js";

const loginVerification = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, jwtPassword);

    const user = await pool.query(`SELECT * FROM usuarios where id = $1`, [id]);

    if (user.rowCount < 1) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const { senha, ...LoggedUser } = user.rows[0];

    req.user = LoggedUser;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

export default loginVerification;
