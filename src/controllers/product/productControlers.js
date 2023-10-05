import { deleteProductByID } from '../../repositories/productRepository.js';

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try{
    await deleteProductByID(id)
    return res.status(200).json({ message: 'produto excluído com sucesso.' })
  }catch(err){
    return res.status(500).json({ message: 'erro interno no servidor.' })
  }
}