const express = require('express')
const server = express()

const Users = require('./users/users-model')

server.use(express.json())

server.post('/api/users', async (req, res, next) => {
    try {
        const newUser = await Users.create(req.body)
        res.status(201).send(newUser)
    }
    catch(err) {
        next(err)
    }
})

server.delete('/api/users', async (req, res, next) => {
    try {
        await Users.remove(req.body)
        res.status(200).json(`${req.body} has been deleted`)
    } catch(err) {
        next(err)
    }
})

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server