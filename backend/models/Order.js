import mongoose from 'mongoose'
const Schema = mongoose.Schema

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    orderItems: [
      {
        name: { type: String, required: [true, 'Name is required'] },
        price: { type: Number, required: [true, 'Price is required'] },
        qty: { type: Number, required: [true, 'Quantity is required'] },
        image: { type: String, required: [true, 'Image is required'] },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product is required'],
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: [true, 'Address is required'] },
      city: { type: String, required: [true, 'City is required'] },
      state: { type: String, required: [true, 'State is required'] },
      zip: { type: String, required: [true, 'Zip is required'] },
      country: { type: String, required: [true, 'Country is required'] },
      phone: { type: String, required: [true, 'Phone is required'] },
      email: { type: String, required: [true, 'Email is required'] },
      name: { type: String, required: [true, 'Name is required'] },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      message: { type: String },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    },
    taxPrice: {
      type: Number,
      required: [true, 'Tax price is required'],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, 'Shipping price is required'],
      default: 0.0,
    },
    itemsPrice: {
      type: Number,
      required: [true, 'Items price is required'],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: [true, 'Is paid is required'],
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: [true, 'Is delivered is required'],
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
