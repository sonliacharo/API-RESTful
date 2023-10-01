const pool = require('../database/pdv')
const joi = require('joi')

const validateRegistration = async (req, res, next) => {
    const { nome, email, senha } = req.body

    try {
        const validarEmail = await pool.query(`select * from usuarios where email = $1`, [email])

        if (validarEmail.rowCount > 0) {
            return res.status(404).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }

        const userData = joi.object({
            nome: joi.string().required().messages({
                'any.required': 'É necessário informar o nome',
                'string.empty': 'O campo não pode ser em branco'
            }),
            email: joi.string().email().required().messages({
                'any.required': 'É necessário informar o email',
                'string.empty': 'O campo não pode ser em branco',
                'string.email': 'E-mail deve ter um formato correto'
            }),
            senha: joi.string().min(6).required().messages({
                'any.required': 'É necessário informar o senha',
                'string.empty': 'O campo não pode ser em branco',
                'string.min': 'A senha deve ter no minino 6 caracteres'
            })
        })

        await userData.validateAsync(req.body)

        next()

    } catch (error) {
        return res.status(400).json({ mensage: error.message })
    }
}

module.exports = validateRegistration