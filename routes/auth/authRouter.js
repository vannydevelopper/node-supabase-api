const express = require('express')
const authController = require('../../controllers/auth/auth.controllers')
const authRouter = express.Router()

authRouter.get('/users/all', authController.getAllData)
authRouter.post('/users/create', authController.createUsers)
authRouter.delete('/users/delete/:id_users', authController.deleteUsers)

module.exports = authRouter