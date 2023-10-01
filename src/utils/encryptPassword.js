import bcrypt from "bcrypt";

const encryptPassword = (senha) => {
  const encryptedPassword = bcrypt.hash(senha, 10);
  return encryptedPassword;
};

export default encryptPassword;
