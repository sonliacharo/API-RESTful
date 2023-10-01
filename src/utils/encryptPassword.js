const bcrypt = require('bcrypt')

const encryptPassword = (senha) => {
    const encryptedPassword = bcrypt.hash(senha, 10)
    return encryptedPassword
}

module.exports = encryptPassword