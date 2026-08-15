// userRoute.js

const express = require('express');
const { createUser, login } = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.post('/createuser', createUser);
userRouter.post('/login', login);

module.exports = userRouter;