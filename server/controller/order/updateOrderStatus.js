import Order from "../../database/order/orderSchema.js"

const updateOrderStatus = async (req, res) => {
  try {

    const { orderId } = req.params


    const {
      status
    } = req.body




    const order = await Order.findById({ _id: orderId })
    if (!order) return res.status(400).json({ msg: 'there is no order with this id' })

    await Order.findByIdAndUpdate({ _id: orderId }, {
      status
    })

    return res.status(200).json({ msg: 'you have updated  order status successfully' })

  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default updateOrderStatus