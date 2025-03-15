import Order from "../../database/order/orderSchema.js"

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params

    const order = await Order.findById({ _id: orderId })

    if (!order) return res.status(400).json({ msg: 'you have no order' })



    return res.status(200).json({ msg: 'get one order successfully', order })

  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default getOrder