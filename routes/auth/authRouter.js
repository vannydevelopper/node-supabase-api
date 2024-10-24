const express = require('express')
const authController = require('../../controllers/auth/auth.controllers')
const authRouter = express.Router()

authRouter.post('/users/login', authController.loginUsers)
authRouter.get('/livres/all', authController.getAllData)


authRouter.post('/users/create', authController.createUsers)
authRouter.delete('/users/delete/:id_users', authController.deleteUsers)

module.exports = authRouter