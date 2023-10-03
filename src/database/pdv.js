import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;
dotenv.config();

const { DB_USER, DB_PORT, DB_HOST, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = new Pool({
  host: DB_USER,
  port: DB_PORT,
  user: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

export default pool;
