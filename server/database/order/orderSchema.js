import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  dowranAlkhser: {
    type: Number,
  },
  dowranAlsdr: {
    type: Number,
  },
  dowranAlardaf: {
    type: Number,
  },
  tolAlkom: {
    type: Number,
  },
  alktf: {
    type: Number,
  },
  tolAltonek: {
    type: Number,
  },
  tolAlsdr: {
    type: Number,
  },
  tolBloza: {
    type: Number,
  },
  tolBntlon: {
    type: Number,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  firstPayment: {
    type: String,
  },
  bookingDay: {
    type: String,
  },
  receiveDay: {
    type: String,
  },
  phone: {
    type: Number,
  },
  photos: [{
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
  }],
  isPaid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'pending'
  },
})

const Order = mongoose.model('orders', orderSchema);


export default Order