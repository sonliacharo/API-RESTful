const { handleServerError } = require('../utils/server')
const pool = require('../database/pdv')

const getCategories = async (req, res) => {
    try {
        const categories = await pool.query('select * from categorias')
        return res.status(200).json(categories.rows)
    } catch (error) {
        return handleServerError(res)
    }
}

module.exports = { getCategories }