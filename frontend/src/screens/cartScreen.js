import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const cartItems = cart.cartItems
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-5 px-4  sm:px-6 lg:max-w-7xl lg:px-8 space-y-5">
        {cartItems.length === 0 ? (
          <div className="text-center mt-24 space-y-6">
            <h2 className="text-center text-2xl">Your cart is empty!</h2>
            <Link
              to="/"
              className="inline-block bg-[#1F2937] text-white px-6 py-3"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            <h2 className="text-center font-semobold text-2xl text-[#121212]">
              Shopping cart
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-16 space-y-10">
              <div className="md:w-3/5">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li className="flex py-6" key={item.product}>
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/product/${item.product}`}>
                                  {' '}
                                  {item.name}{' '}
                                </Link>
                              </h3>
                              <p> ${item.price * item.qty}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Salmon</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center space-x-3">
                              <input
                                className="w-1/4 h-8 px-4 py-2 text-center border border-gray-200 rounded-md"
                                type="number"
                                min={1}
                                max={item.countInStock}
                                id={item.product}
                                value={item.qty}
                                onChange={(e) => {
                                  dispatch(
                                    addToCart(
                                      item.product,
                                      Number(e.target.value)
                                    )
                                  ).then(() => {
                                    toast.success('Cart updated!', {
                                      position: 'bottom-left',
                                      autoClose: 3000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    })
                                  })
                                }}
                              />
                              <span>x</span>
                              <p className="ml-4">${item.price}</p>
                            </div>

                            <div className="flex">
                              <button
                                onClick={() =>
                                  removeFromCartHandler(item.product)
                                }
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 space-x-2"
                              >
                                <i className="fas fa-trash"></i> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:w-2/5">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to={'/checkout'}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link
                      to={'/'}
                      type="button"
                      className="font-medium text-indigo-600
                      hover:text-indigo-500"
                    >
                      {' '}
                      Continue Shopping
                      <span aria-hidden="true"> →</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartScreen
