import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'

const CheckoutScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { userInfo } = user
  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress } = cart
  const [errMessage, setErrMessage] = useState('')
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimal(
    cartItems.reduce((a, c) => a + c.price * c.qty, 0)
  )
  cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 10)
  cart.taxPrice = addDecimal(Number((cart.itemsPrice * 0.15).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false)
  const initiateValues = {
    name: '',
    company: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    note: '',
    items: [],
    total: 0,
    shipping: 0,
    tax: 0,
    subtotal: 0,
    totalWithTax: 0,
    sHname: '',
    sHcompany: '',
    sHaddress: '',
    sHcity: '',
    sHstate: '',
    sHzip: '',
    sHcountry: '',
    sHphone: '',
    paymentMethod: 'paypal',
  }

  const [values, setValues] = useState(initiateValues)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, error, success } = orderCreate
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
    //eslint-disable-next-line
  }, [navigate, success])

  const formHandler = (event) => {
    event.preventDefault()
    setErrMessage('')
    if (
      !values.name ||
      !values.email ||
      !values.address ||
      !values.city ||
      !values.state ||
      !values.zip ||
      !values.country ||
      !values.phone ||
      !values.company
    ) {
      setErrMessage('Please fill in all required fields')
      return
    }
    dispatch(saveShippingAddress(values))

    if (!userInfo) {
      navigate('/login')
    }
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.shippingAddress.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  useEffect(() => {
    if (userInfo) {
      setValues({ name: userInfo.name, email: userInfo.email })
    }
    if (shippingAddress) {
      setValues(shippingAddress)
    }
  }, [shippingAddress, userInfo])

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto  px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl mb-5 text-center">Checkout</h2>
        {userInfo ? (
          ''
        ) : (
          <p className="py-1 px-3 border border-dashed w-72  border-red-500 mb-5">
            <Link to={'/login'} className="text-red-600">
              {' '}
              Login?{' '}
            </Link>{' '}
            or <Link to={'/register'}> Create an account?</Link>
          </p>
        )}

        {errMessage && (
          <div
            class="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            {errMessage}
          </div>
        )}
        <form onSubmit={formHandler}>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-5">
            <div className="flex flex-col md:w-2/3 space-y-5">
              <div className="billing-details">
                <h3 className="text-lg mb-3">Billing Details</h3>
                <div className="grid grid-cols-12 space-y-5">
                  <div className="col-span-12 md:col-span-12 space-y-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full"
                      value={values.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 space-y-2 md:mr-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                      type="email"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 space-y-2 md:ml-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Company Name (Optional)
                    </label>
                    <input
                      name="company"
                      value={values.company}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-12 space-y-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Street Address *
                    </label>
                    <input
                      name="address"
                      value={values.address}
                      onChange={handleInputChange}
                      type="text"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 space-y-2 md:mr-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Town/City *
                    </label>
                    <input
                      name="city"
                      value={values.city}
                      onChange={handleInputChange}
                      type="text"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 space-y-2 md:ml-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      State *
                    </label>
                    <input
                      name="state"
                      value={values.state}
                      onChange={handleInputChange}
                      type="text"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 space-y-2 md:mr-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Postal Code /ZIP *
                    </label>
                    <input
                      name="zip"
                      value={values.zip}
                      onChange={handleInputChange}
                      type="text"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="col-span-12 md:col-span-6 space-y-2 md:ml-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Country *
                    </label>
                    <input
                      name="country"
                      value={values.country}
                      onChange={handleInputChange}
                      type="text"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 space-y-2 md:mr-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Phone *
                    </label>
                    <input
                      name="phone"
                      value={values.phone}
                      onChange={handleInputChange}
                      type="text"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-12 space-y-2 ">
                    <label className="block font-medium leading-5 text-gray-700 items-center">
                      <input
                        type={'checkbox'}
                        defaultChecked={shipToDifferentAddress}
                        onChange={(e) =>
                          setShipToDifferentAddress(e.target.checked)
                        }
                      />{' '}
                      Ship to a different address?
                    </label>
                  </div>
                </div>
              </div>
              {shipToDifferentAddress && (
                <div className="shipping-details">
                  <h3 className="text-lg mb-3">Shiping Details</h3>
                  <div className="grid grid-cols-12 space-y-5">
                    <div className="col-span-12 md:col-span-12 space-y-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        Name *
                      </label>
                      <input
                        required
                        value={values.sHname}
                        onChange={handleInputChange}
                        name="sHname"
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-12 space-y-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        Company Name (optional)
                      </label>
                      <input
                        value={values.sHcompany}
                        onChange={handleInputChange}
                        name="sHcompany"
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-12 space-y-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        Street Address *
                      </label>
                      <input
                        required
                        value={values.sHaddress}
                        onChange={handleInputChange}
                        name="sHaddress"
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6 space-y-2 md:mr-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        Town/City *
                      </label>
                      <input
                        name="sHcity"
                        required
                        value={values.sHcity}
                        onChange={handleInputChange}
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6 space-y-2 md:ml-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        State *
                      </label>
                      <input
                        required
                        value={values.sHstate}
                        onChange={handleInputChange}
                        name="sHstate"
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6 space-y-2 md:mr-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        Postal Code /ZIP *
                      </label>
                      <input
                        required
                        value={values.sHzip}
                        onChange={handleInputChange}
                        name="sHzip"
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6 space-y-2 md:mr-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        Country *
                      </label>
                      <input
                        name="country"
                        value={values.sHcountry}
                        onChange={handleInputChange}
                        type="text"
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6 space-y-2 md:ml-2">
                      <label className="block font-medium leading-5 text-gray-700">
                        Phone *
                      </label>
                      <input
                        name="sHphone"
                        type="text"
                        required
                        value={values.sHphone}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="order-notes">
                <div className="grid grid-cols-12 ">
                  <div className="col-span-12 md:col-span-12 space-y-2">
                    <label className="block font-medium leading-5 text-gray-700">
                      Order notes (optional)
                    </label>
                    <textarea
                      defaultValue={values.note}
                      name="note"
                      rows="4"
                      className="w-full"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:w-1/3 bg-[#F9F9F9] p-6 space-y-3 border border-dashed border-[#d9d0d0]">
              <h3 className="text-lg">Your Order</h3>
              <hr />
              <div className="cart-items flex justify-between">
                <h4>Products</h4>
                <h4>Total</h4>
              </div>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="cart-items flex justify-between text-sm"
                  >
                    <div className="flex space-x-2">
                      <img src={item.image} className="w-5" alt={item.name} />
                      <Link to={`/product/${item.id}`}>
                        <h4 className="flex space-x-2"> {item.name} </h4>
                      </Link>

                      <span>x</span>
                      <span>{item.qty}</span>
                    </div>

                    <h4>${addDecimal(item.price)}</h4>
                  </div>
                ))
              ) : (
                <div className="cart-items flex justify-center text-sm">
                  <h4>Your cart is empty</h4>
                </div>
              )}

              <div className="cart-items flex justify-between">
                <h4>Subtotal</h4>
                <h4>${cartItems.length > 0 ? cart.itemsPrice : '0.00'}</h4>
              </div>
              <hr />
              <div className="cart-items flex justify-between text-sm">
                <h4>Shipping</h4>
                <h4>
                  {cart.shippingPrice > 0
                    ? `$${cart.shippingPrice}`
                    : 'Free Shipping'}
                </h4>
              </div>
              <div className="cart-items flex justify-between text-sm">
                <h4>Tax</h4>
                <h4>${cart.taxPrice}</h4>
              </div>
              <div className="cart-items flex justify-between">
                <h4>Subtotal</h4>
                <h4>${cart.totalPrice}</h4>
              </div>
              <hr />
              <h3 className="text-lg">Payment Methods</h3>
              <hr />

              <label className="block font-medium leading-5 text-gray-700">
                <input
                  name="paymentMethod"
                  type={'radio'}
                  value="paypal"
                  checked={values.paymentMethod === 'paypal'}
                  onClick={handleInputChange}
                  className="mr-2"
                />
                Paypal or Credit card
              </label>
              <label className="block font-medium leading-5 text-gray-700">
                <input
                  name="paymentMethod"
                  type={'radio'}
                  value="stripe"
                  checked={values.paymentMethod === 'stripe'}
                  className="mr-2"
                  onClick={handleInputChange}
                />
                Stripe
              </label>
              {error && (
                <div
                  class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {error}
                </div>
              )}
              <button
                disabled={cartItems.length === 0}
                type="submit"
                className="text-red-600 py-1 border border-red-600 disabled:border-gray-400 disabled:text-gray-400"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutScreen
