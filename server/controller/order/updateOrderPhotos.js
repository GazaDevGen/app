import Order from "../../database/order/orderSchema.js"

const updateOrderPhotos = async (req, res) => {
  try {

    const { orderId } = req.params
    const file = req.files
    const photos = file.map((f) => f.filename)

    const order = await Order.findById({ _id: orderId })
    if (!order) return res.status(400).json({ msg: 'there is no order with this id' })

    await Order.findByIdAndUpdate({ _id: orderId }, {
      photos
    })

    return res.status(200).json({ msg: 'you have updated  order photos successfully' })

  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default updateOrderPhotos