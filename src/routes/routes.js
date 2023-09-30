const express = require('express')

const route = express()

const { getCategories } = require('../controllers/categories')

route.get('/categoria', getCategories)

module.exports = route
