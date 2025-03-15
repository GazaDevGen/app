import express from 'express'
import {
  deleteUser,
  getUser,
  login,
  logout,
  signup,
  updatePassword,
} from '../../controller/index.js'
import checkAuth from '../../middlewares/checkAuth.js'

const userRouter = express.Router()

userRouter.post('/signup',  signup)
userRouter.post('/login', login)
userRouter.delete('/logout', logout)
userRouter.get('/user', checkAuth, getUser)
userRouter.put('/password', checkAuth, updatePassword)
userRouter.delete('/', checkAuth, deleteUser)

export default userRouter