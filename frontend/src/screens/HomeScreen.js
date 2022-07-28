import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Hero from '../components/Hero'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'

const HomeScreen = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, count, error } = productList

  const [limit, setLimit] = useState(4)

  useEffect(() => {
    dispatch(listProducts(keyword, limit))
  }, [dispatch, keyword, limit])

  return (
    <div>
      <Helmet>
        <title>Welcome to Ecommerce | Home</title>
        <meta
          name="description"
          content="Ecommerce site with React and Node js"
        />
        <meta
          name="keywords"
          content="Ecommerce, React, Redux, Nodejs, MongoDB"
        />
      </Helmet>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto  px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
          <Hero />
          <h2 className="text-2xl text-center mb-5 mt-15">Recent Products</h2>

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

                {count > limit && (
                  <button
                    onClick={(e) => setLimit(limit + 4)}
                    className="mt-10 w-40 px-6 py-2 bg-black text-white m-auto block"
                  >
                    Load more
                  </button>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
