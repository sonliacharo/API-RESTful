import pool from "../database/pdv.js";

export const findProductByID = async (id) => {
  const query = `select * from produtos
    where id = $1`;

  const params = [id];
  const result = await pool.query(query, params);

  return result.rows.length > 0 ? result.rows[0] : null;
};

export const deleteProductByID = async (id) => {
  const query = `delete from produtos where id = $1 returning *;`;

  const params = [id];
  const result = await pool.query(query, params);

  return result.rows.length > 0 ? result.rows[0] : null;
};

export const productList = async () => {
  const query = `select * from produtos`;

  const result = await pool.query(query);

  return result.rows.length > 0 ? result.rows : null;
};

export const findProductByCategoria_ID = async (id) => {
  const query = 'select * from produtos where categoria_id = $1';

  const params = [id];
  const result = await pool.query(query, params);

  return result.rows.length > 0 ? result.rows[0] : null;
};

