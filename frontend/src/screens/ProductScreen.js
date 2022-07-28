import { Markup } from 'interweave'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToCart } from '../actions/cartActions'
import { addReview, singleProduct } from '../actions/productActions'
import { logout } from '../actions/userActions'
import Loading from '../components/Loading'

import Rating from '../components/utill/Rating'

const ProductScreen = ({ action }) => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const userInfo = useSelector((state) => state.user.userInfo)

  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails

  const productReview = useSelector((state) => state.productReview)
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReview

  const [qty, setQty] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [detailsTab, setDetailsTab] = useState(true)
  const [reviewTab, setReviewsTab] = useState(false)
  const [reviewRating, setReviewRating] = useState(1)
  const [reviewComment, setReviewComment] = useState('')

  const alreadyReviewd = () => {
    if (product.reviews.length > 0) {
      return product.reviews.find(
        (review) => review.user.toString() === userInfo.id.toString()
      )
    }
  }

  useEffect(() => {
    dispatch(singleProduct(id))
    if (error === 'jwt expired' || errorReview === 'jwt expired') {
      toast.error('Your session has expired. Please login again.')
      dispatch(logout())
    }
    if (successReview) {
      toast.success('Review added successfully.')
    }
    if (errorReview) {
      toast.error(errorReview)
    }
  }, [dispatch, id, successReview, errorReview, error])

  const addToCartHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(addToCart(id, qty))
      .then((res) => {
        action()
        toast.success('Added to cart successfuly!', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addReviewHandler = (e) => {
    e.preventDefault()
    if (userInfo) {
      dispatch(
        addReview({
          id: product._id,
          rating: reviewRating,
          comment: reviewComment,
        })
      )
    } else {
      toast.error('Please login to add review.')
    }
  }

  return (
    <div className="bg-white">
      <Helmet>
        <title>{product && `${product.name} | Ecommerce`} </title>
        <meta
          name="description"
          content="Ecommerce site with React and Node js"
        />
        <meta
          name="keywords"
          content="Ecommerce, React, Redux, Nodejs, MongoDB"
        />
      </Helmet>
      <div className="max-w-2xl mx-auto py-5 px-4  sm:px-6 lg:max-w-7xl lg:px-8 space-y-5">
        <div className="">
          <Link to="/">GO BACK</Link>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="flex flex-col product-image  md:w-2/5">
                <img src={product.image} alt="" />
              </div>
              <div className="flex flex-col product-info space-y-3">
                <h2 className="text-3xl font-semibold">{product.name}</h2>
                <p className="text-2xl font-medium">${product.price}</p>
                <Rating value={product.rating} text={product.numReviews} />
                <Markup content={product.description} />

                <form onSubmit={addToCartHandler}>
                  <div className="flex space-x-10 items-center">
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      className="w-full h-12 text-gray-800 border-gray-800 border-2 py-2 px-4"
                      placeholder="Quantity"
                      onChange={(e) => setQty(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={
                        product.countInStock <= 0 || qty > product.countInStock
                      }
                      className="w-full bg-gray-800 text-white h-12 leading-0 hover:bg-purple-900 disabled:bg-gray-500"
                    >
                      {isLoading ? (
                        <svg
                          role="status"
                          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      ) : (
                        ''
                      )}
                      {product.countInStock === 0
                        ? 'Sold out'
                        : qty > product.countInStock && product.countInStock > 0
                        ? 'Maxed out'
                        : isLoading
                        ? 'Adding...'
                        : 'Add to cart'}
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
              <ul className="flex flex-wrap text-xl text-center text-black border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2">
                  <button
                    onClick={() => {
                      setDetailsTab(true)
                      setReviewsTab(false)
                    }}
                    aria-current="page"
                    className={`${
                      detailsTab ? 'text-gray-600 bg-gray-100 rounded-t-lg' : ''
                    } inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50`}
                  >
                    Details
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => {
                      setDetailsTab(false)
                      setReviewsTab(true)
                    }}
                    className={`${
                      reviewTab ? 'text-gray-600 bg-gray-100 rounded-t-lg' : ''
                    }  inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 `}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              {detailsTab && (
                <div className="details p-4 bg-gray-50">
                  <Markup content={product.description} />
                </div>
              )}
              {reviewTab && (
                <div className="reviews">
                  <h3 className="text-xl">Reviews</h3>
                  <div className="flex space-x-4">
                    <Rating value={product.rating} text={product.numReviews} />
                    <p>{product.rating} out of 5</p>
                  </div>
                  <div className="newReview mt-10">
                    <h3 className="text-xl">Write a review</h3>
                    {!userInfo ? (
                      <h3>
                        Please <Link to={'/login'}>login</Link> to review
                      </h3>
                    ) : alreadyReviewd() ? (
                      <h3>You already reviewed this product.</h3>
                    ) : (
                      <form
                        onSubmit={(e) => addReviewHandler(e)}
                        className="space-y-2"
                      >
                        <div className="flex flex-col space-y-1">
                          <label className="text-sm">Rating *</label>
                          <select
                            onChange={(e) => setReviewRating(e.target.value)}
                          >
                            <option value="1">Poor</option>
                            <option value="2">Fair</option>
                            <option value="3">Good</option>
                            <option value="4">Very Good</option>
                            <option value="5">Excelent</option>
                          </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label htmlFor="name">Comment *</label>
                          <textarea
                            required
                            onChange={(e) => setReviewComment(e.target.value)}
                            rows={3}
                            className="w-full"
                            placeholder="comments.."
                            value={reviewComment}
                          ></textarea>
                        </div>
                        <div>
                          <button
                            disabled={loadingReview}
                            type="submit"
                            className="bg-black px-6 py-2 text-white"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="reviews-list mt-5 space-y-4">
                    {product.reviews.length > 0 ? (
                      product.reviews.map((review) => (
                        <article key={review._id}>
                          <div className="flex items-center mb-4 space-x-4">
                            <img
                              className="w-10 h-10 rounded-full"
                              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              alt=""
                            />
                            <div className="space-y-1 font-medium dark:text-white">
                              <p>{review.name}</p>
                              <Rating value={review.rating} />{' '}
                            </div>
                          </div>
                          <div className="flex items-center mb-1">
                            <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                              {review.comment}
                            </h3>
                          </div>
                          <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                            <p>
                              Reviewed on{' '}
                              <time
                                dateTime={review.createdAt.substring(0, 10)}
                              >
                                {review.createdAt.substring(0, 10)}
                              </time>
                            </p>
                          </footer>
                        </article>
                      ))
                    ) : (
                      <p className="text-xl">No reviews yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductScreen
