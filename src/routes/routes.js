const express = require('express')

const route = express()

const { getCategories } = require('../controllers/categories')
const validateRegistration = require('../intermediarios/validateRegistration')
const registerUser = require('../controllers/registerUser')

route.get('/categoria', getCategories)
route.post('/usuario', validateRegistration, registerUser)

module.exports = route
