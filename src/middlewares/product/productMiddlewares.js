import { findProductByID } from '../../repositories/productRepository.js'

export const checkIdProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await findProductByID(id)
  
    if(!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' })
    }

    next()

  }catch(err) {
    return res.status(500).json({ message: 'erro interno no servidor.' })
  }
}


