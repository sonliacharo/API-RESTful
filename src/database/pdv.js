const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port:5432,
    user: 'postgres',
    password: '123456',
    database: 'pdv'
});

module.exports = pool