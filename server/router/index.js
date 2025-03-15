import express from 'express'
import userRouter from './user/index.js'
import orderRouter from './order/index.js'

const router = express.Router()

router.use('/users', userRouter)
router.use('/orders', orderRouter)


export default router