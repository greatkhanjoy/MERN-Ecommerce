import Product from '../models/Product.js'

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
  }
}

export default { getProducts, getProduct }
