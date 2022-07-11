import express from 'express'
const Router = express.Router()

import { getProduct, getProducts } from '../controllers/productController.js'

Router.route('/').get(getProducts)
Router.route('/:id').get(getProduct)

export default Router
