import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
// import Products from '../Products'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get('/api/products')
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto  px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl mb-5">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
