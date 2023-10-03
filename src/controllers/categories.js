import handleServerError from "../utils/serverError.js";
import pool from "../database/pdv.js";

const getCategories = async (req, res) => {
  try {
    const categories = await pool.query("select * from categorias");
    return res.status(200).json(categories.rows);
  } catch (error) {
    return handleServerError(res);
  }
};

export { getCategories };
