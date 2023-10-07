import pool from "../database/pdv.js";

export const findClients = async () => {
  const query = `select * from clientes`;

  const result = await pool.query(query);

  return result.rows.length > 0 ? result.rows : null;
};

export const editClientById = async (userData) => {
  const { nome, email, cpf, id } = userData;

  const query = `UPDATE clientes SET nome = $1, email = $2,  cpf = $3 WHERE id = $4 RETURNING id, nome, email`;

  const params = [nome, email, cpf, id];
  const result = await pool.query(query, params);

  return result.rows[0];
};

export const findClienttByID = async (id) => {
  const query = `select * from clientes
    where id = $1`;

  const params = [id];
  const result = await pool.query(query, params);

  return result.rows.length > 0 ? result.rows[0] : null;
};

export const checkEmailInUse = async (email) => {
  const query = `SELECT COUNT(*) FROM clientes WHERE email = $1`;
  const params = [email];

  const result = await pool.query(query, params);

  return result.rows[0].count > 0;
};

export const checkCPFInUse = async (cpf) => {
  const query = `SELECT COUNT(*) FROM clientes WHERE cpf = $1`;
  const params = [cpf];

  const result = await pool.query(query, params);

  return result.rows[0].count > 0;
};
