import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { getAccountUser, refreshTokenUser, loginUser, registerUser, listUser, logoutUser } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post('/get-user-account', authMiddleware, getAccountUser)
userRouter.post('/refreshToken', refreshTokenUser)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.get('/list', listUser)


export default userRouter