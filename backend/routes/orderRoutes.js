import Express from 'express'
const Router = Express.Router()

import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderByID,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'

Router.route('/')
  .post(protect, addOrderItems)
  .get(protect, adminOnly, getAllOrders)
Router.route('/myorders').get(protect, getMyOrders) // get my orders
Router.route('/:id').get(protect, getOrderByID) // get order by id
Router.route('/:id/pay').put(protect, updateOrderToPaid) // update order to paid
Router.route('/:id/delivered').put(protect, adminOnly, updateOrderToDelivered) // update order to delivered

export default Router
