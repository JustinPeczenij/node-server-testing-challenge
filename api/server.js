const express = require('express')
const server = express()

// const Users = require('./users/users-model')

server.use(express.json())

module.exports = server