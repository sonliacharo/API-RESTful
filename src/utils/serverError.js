const handleServerError = (res) => {
  return res.status(500).json({ mensagem: "Erro interno do servidor." });
};

export default handleServerError;
