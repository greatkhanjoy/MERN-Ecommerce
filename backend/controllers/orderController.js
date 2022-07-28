import AsyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import hasPermission from '../utill/hasPermission.js'

//@desc    New Order
//@route   POST /api/orders
//@access  Private
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
const getOrderByID = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  const permitted = await hasPermission(req.user, order.user)
  if (!permitted) {
    return res.status(401).json({
      message: 'Not authorized',
    })
  }
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  res.status(200).json(order)
})

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
})

//@desc Order payment
//@route POST /api/orders/:id/pay
//@access Private
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

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getAllOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email')
  res.status(200).json(orders)
})

//@desc Mark order as delivered
//@route POST /api/orders/:id/delivered
//@access Private/Admin
const updateOrderToDelivered = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
}
