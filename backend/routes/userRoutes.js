import express from 'express'
import {
  authUser,
  deleteUser,
  editUser,
  getUserProfile,
  getusers,
  registerUser,
  updateUser,
} from '../controllers/userController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/').get(protect, adminOnly, getusers).post(registerUser)
Router.route('/login').post(authUser)
Router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
Router.route('/:id')
  .delete(protect, adminOnly, deleteUser)
  .put(protect, adminOnly, editUser)

export default Router
