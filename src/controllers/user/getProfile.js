import pool from "../../database/pdv.js";
import handleServerError from "../../utils/serverError.js";

const getProfile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return handleServerError(res);
  }
};

export default getProfile;
