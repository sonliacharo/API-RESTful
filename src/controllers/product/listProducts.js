import { findProductByCategoria_ID, productList } from '../../repositories/productRepository.js';
import handleServerError from "../../utils/serverError.js";

const listProducts = async (req, res) => {
    const { categoria_id } = req.query
    try {
        if(categoria_id) {
            const product = await findProductByCategoria_ID(categoria_id)
            return res.status(200).json(product);
        }

        const products = await productList()
        return res.status(200).json(products);

    } catch (error) {
        return handleServerError(res);
    }
}

export default listProducts