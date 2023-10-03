import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const jwtPassword = process.env.JWT_PASSWORD;

export default jwtPassword;
