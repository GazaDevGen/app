import Order from "../../database/order/orderSchema.js"

const updateOrder = async (req, res) => {
  try {

    const { orderId } = req.params


    const {
      customerName,
      dowranAlkhser,
      dowranAlsdr,
      dowranAlardaf,
      tolAlkom,
      alktf,
      tolAltonek,
      tolAlsdr,
      tolBloza,
      tolBntlon,
      description,
      price,
      firstPayment,
      bookingDay,
      receiveDay,
      phone,
    } = req.body



    const order = await Order.findById({ _id: orderId })
    if (!order) return res.status(400).json({ msg: 'there is no order with this id' })

    await Order.findByIdAndUpdate({ _id: orderId }, {
      customerName,
      dowranAlkhser,
      dowranAlsdr,
      dowranAlardaf,
      tolAlkom,
      alktf,
      tolAltonek,
      tolAlsdr,
      tolBloza,
      tolBntlon,
      description,
      price,
      firstPayment,
      bookingDay,
      receiveDay,
      phone,
    })

    return res.status(200).json({ msg: 'you have updated  order successfully' })

  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default updateOrder