import { findProductByID } from '../../repositories/productRepository.js';
import handleServerError from "../../utils/serverError.js";

const listProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await findProductByID(id)
        return res.status(200).json(product);

    } catch (error) {
        return handleServerError(res);
    }

}

export default listProduct