import Order from "../../database/order/orderSchema.js";

const createOrder = async (req, res) => {
  try {

    // Extract order data from the request body
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
    } = req.body;
      console.log("🚀 ~ createOrder ~ customerName:", customerName)

    if (!customerName || !phone) {
      return res.status(400).json({ msg: 'Customer name and phone are required' });
    }
    console.log("🚀 ~ createOrder ~ photos:", req.files)

    const photos = req.files.map((file) => file);

    await Order.create({
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
      photos,
    });

    // Return success response
    return res.status(201).json({ msg: 'Order created successfully' });

  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ msg: 'Failed to create order', error: error.message });
  }
};

export default createOrder;