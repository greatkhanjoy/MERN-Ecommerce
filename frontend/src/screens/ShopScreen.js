import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'

const ShopScreen = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  // eslint-disable-next-line
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    dispatch(listProducts(keyword, limit))
  }, [dispatch, keyword, limit])

  return (
    <div className="bg-white">
      <Helmet>
        <title>Shop | Ecommerce</title>
        <meta
          name="description"
          content="Ecommerce site with React and Node js"
        />
        <meta
          name="keywords"
          content="Ecommerce, React, Redux, Nodejs, MongoDB"
        />
      </Helmet>
      <div className="max-w-2xl mx-auto  px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <h3> {error} </h3>
        ) : (
          products.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default ShopScreen
