import Express from 'express'
const Router = Express.Router()

import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { protect } from '../middlewares/authMiddleware.js'

Router.route('/').post(protect, addOrderItems)
Router.route('/:id').get(protect, getOrderByID) // get order by id
Router.route('/:id/pay').put(protect, updateOrderToPaid) // update order to paid

export default Router
