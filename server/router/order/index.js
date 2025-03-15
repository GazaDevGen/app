import express from 'express'

import { createOrder, deleteOrder, getOrder, getOrders, updateOrder, updateOrderPhotos, updateOrderStatus } from '../../controller/index.js'
import upload from '../../middlewares/uploadOrder.js'

const orderRouter = express.Router()
orderRouter.post('/', upload.any('photos'), createOrder)
orderRouter.get('/', getOrders)
orderRouter.get('/:orderId', getOrder)
orderRouter.put('/:orderId', updateOrder)
orderRouter.put('/status/:orderId', updateOrderStatus)
orderRouter.put('/photos/:orderId', updateOrderPhotos)
orderRouter.delete('/:orderId', deleteOrder)



export default orderRouter