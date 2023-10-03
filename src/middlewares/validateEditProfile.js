import joi from "joi";

const validateEditProfile = async (req, res, next) => {
  const { nome, senha } = req.body;

  try {
    const userData = joi.object({
      nome: joi.string().required().messages({
        "any.required": "É necessário informar o nome",
        "string.empty": "O campo não pode ser em branco",
      }),
      senha: joi.string().min(6).messages({
        "string.min": "A senha deve ter no mínimo 6 caracteres",
      }),
    });

    await userData.validateAsync({ nome, senha });

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

export default validateEditProfile;
