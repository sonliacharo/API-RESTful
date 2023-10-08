import pool from '../database/pdv.js'

export const createCustomer = async (userData) => {
  const { nome, email, cpf } = userData;

  const query = ` insert into clientes
      (nome, email, cpf)
      values($1, $2, $3)
      returning * ;
    `;

  const params = [nome, email, cpf];
  const newTransaction = await pool.query(query, params);

  return newTransaction.rows[0];
};
