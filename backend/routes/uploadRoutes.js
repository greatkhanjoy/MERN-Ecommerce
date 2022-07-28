import express from 'express'
import { upload } from '../controllers/uploadController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/').post(protect, adminOnly, upload)

export default Router
