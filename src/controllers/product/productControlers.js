import pool from "../../database/pdv.js";
import { deleteProductByID } from '../../repositories/productRepository.js';
import handleServerError from '../../utils/serverError.js';

export const registerProduct = async (req, res) => {
    try {
      const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
      const existingCategory = await pool.query (`select id from categorias where id = $1`, [categoria_id]);
      
      if (existingCategory.rows.length === 0) {
        return res.status(400).json({error: 'Non existing category.'});
      }

      const query = `insert into produtos (descricao, quantidade_estoque, valor, categoria_id) values ($1, $2, $3, $4) returning *`;
      const values = [descricao, quantidade_estoque, valor, categoria_id];
      const newProduct = await pool.query(query, values)

      return res.status(201).json(newProduct.rows[0]);
    } catch (error) {
      console.log(error)
      return handleServerError(res);
    }
}

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params
    const existingProduct = await pool.query(`select * from produtos where id = $1`, [id]);

    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const query = `update produtos set descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4 where id = $5 returning *`;
    const values = [ descricao, quantidade_estoque, valor, categoria_id, id];
    const updatedProduct = await pool.query(query, values);
    return res.status(201).json(updatedProduct.rows[0]);
  } catch (error) {
    return handleServerError(res);
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
 
  try{
    await deleteProductByID(id)
    return res.status(200).json({ message: 'produto excluído com sucesso.' })
  }catch(err){
    return res.status(500).json({ message: 'erro interno no servidor.' })
  }
}