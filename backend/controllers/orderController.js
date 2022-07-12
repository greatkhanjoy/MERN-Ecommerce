import AsyncHandler from 'express-async-handler'
import Order from '../models/order.js'

const addOrderItems = AsyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  console.log(req.body)
  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({
      message: 'Order items is required',
    })
  }
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })
  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

//@desc Get single order
//@route GET /api/orders/:id
//@access Private
const getOrderByID = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  res.status(200).json(order)
})

const updateOrderToPaid = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export { addOrderItems, getOrderByID, updateOrderToPaid }
