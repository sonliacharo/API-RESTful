import pool from '../database/pdv.js'
import { encryptPassword } from '../utils/encryptPassword.js'

export const findUserByID = async (id) => {
  const query = `select id, nome, email from usuarios where id = $1`

  const params = [id]
  const result = await pool.query(query, params)
  
  return result.rows.length > 0 ? result.rows[0] : null
}

export const createUser = async (userData) => {
  const { nome, email, senha } = userData

  const query = ` insert into usuarios
    (nome, email, senha)
    values($1, $2, $3)
    returning * ;
  `

  const params = [nome, email, await encryptPassword(senha)]
  const newTransaction = await pool.query(query, params)

  return newTransaction.rows[0]
}

export const findUserByEmail = async (email) => {
  const query = `select * from usuarios
    where email = $1`

  const params = [email]
  const result = await pool.query(query, params)

  return result.rows.length > 0 ? result.rows[0] : null
}
