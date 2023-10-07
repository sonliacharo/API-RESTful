import pool from "../database/pdv.js";

export const findClients = async () => {
  const query = `select * from clientes`;

  const result = await pool.query(query);

  return result.rows.length > 0 ? result.rows : null;
};
