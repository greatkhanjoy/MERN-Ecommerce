import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/login').post(authUser)
Router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
Router.route('/').post(registerUser)

export default Router
