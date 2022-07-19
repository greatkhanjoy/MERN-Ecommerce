import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToCart, removeFromCart } from '../../actions/cartActions'
const CartDrawer = ({ action, toggle }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const cartItems = cart.cartItems

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div
      className={`${toggle ? 'relative z-10' : ''}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="false"
    >
      <div
        onClick={action}
        className={`${
          toggle
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            : ''
        }`}
      ></div>

      <div className={`${toggle ? 'fixed inset-0 overflow-hidden' : ''}`}>
        <div className={`${toggle ? 'absolute inset-0 overflow-hidden' : ''}`}>
          <div
            className={`pointer-events-none fixed inset-y-0  flex max-w-full  pl-10 ${
              toggle
                ? 'transition  delay-150 -translate-x-1 scale-1 right-0'
                : 'transition  delay-150 translate-x-1 scale-0 right-0'
            }`}
          >
            <div className="pointer-events-auto w-screen max-w-md ">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={action}
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>

                        <svg
                          className="h-6 w-6 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    {cartItems.length === 0 ? (
                      <div className="space-y-6 text-center">
                        <h2 className="text-center text-2xl">
                          Your cart is empty!
                        </h2>
                        <Link
                          onClick={action}
                          to={'/'}
                          className="inline-block bg-[#1F2937] text-white px-6 py-3"
                        >
                          {' '}
                          Continue Shopping{' '}
                        </Link>
                      </div>
                    ) : (
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
                                      <Link
                                        onClick={action}
                                        to={`/product/${item.product}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">
                                      ${item.qty * item.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Salmon
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex space-x-2 items-center">
                                    <input
                                      className="w-1/4 h-8 px-2 py-2 text-center border border-gray-200 rounded-md"
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
                                    <p>${item.price}</p>
                                  </div>

                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        removeFromCartHandler(item.product)
                                      }
                                      type="button"
                                      className="font-medium text-red-600 hover:text-red-500 space-x-3"
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
                    )}
                  </div>
                </div>
                {cartItems.length === 0 ? (
                  ''
                ) : (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        $
                        {cartItems.reduce(
                          (acc, item) => acc + item.price * item.qty,
                          0
                        )}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        onClick={action}
                        to={'/checkout'}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <Link
                          onClick={action}
                          to={'/'}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
