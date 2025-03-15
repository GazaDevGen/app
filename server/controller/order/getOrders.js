import Order from "../../database/order/orderSchema.js"

const getOrders = async (req, res) => {
  try {


    const orders = await Order.find()

    if (!orders) return res.status(400).json({ msg: 'you have no order' })



    return res.status(200).json({ msg: 'get all orders successfully', orders })

  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default getOrders