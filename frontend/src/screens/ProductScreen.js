import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Rating from '../components/utill/Rating'

const ProductScreen = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data)
      })
      .catch((error) => console.log(error))
  }, [id])

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-5 px-4  sm:px-6 lg:max-w-7xl lg:px-8 space-y-5">
        <div className="">
          <Link to="/">GO BACK</Link>
        </div>
        <div className="flex space-x-10">
          <div className="flex flex-col product-image w-3/5">
            <img src={product.image} alt="" />
          </div>
          <div className="flex flex-col product-info space-y-3">
            <h2 className="text-3xl font-semibold">{product.name}</h2>
            <p className="text-2xl font-medium">${product.price}</p>
            <Rating value={product.rating} text={product.numReviwes} />
            <p>{product.description}</p>
            <p className="space-x-2">
              <i
                className={
                  product.countInStock > 0
                    ? 'fa-solid fa-check'
                    : 'fa-solid fa-xmark'
                }
              ></i>

              <span>{product.countInStock > 0 ? 'In Stock' : 'Sold out'}</span>
            </p>
            <form>
              <div className="flex space-x-10 items-center">
                <input
                  type="number"
                  className="w-full h-12 text-gray-800 border-gray-800 border-2 py-2 px-4"
                  placeholder="Quantity"
                />
                <button
                  disabled={product.countInStock <= 0}
                  className="w-full bg-gray-800 text-white h-12 leading-0 hover:bg-purple-900 disabled:bg-gray-500"
                >
                  Add to Cart
                </button>
              </div>
            </form>
            <div className="flex space-x-5">
              <p>Category: {product.category}</p>
              <p>Brand: {product.brand}</p>
            </div>
          </div>
        </div>
        <div className="">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen
