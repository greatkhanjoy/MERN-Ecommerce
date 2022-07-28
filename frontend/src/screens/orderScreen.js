import axios from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
const OrderScreen = () => {
  const { id } = useParams()
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const { userInfo } = user

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.type = 'text/javascript'
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, id, successPay, order, userInfo, navigate])
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(id, paymentResult))
  }

  return (
    <div className="bg-white">
      <Helmet>
        <title>Order | Ecommerce </title>
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
          <h3>Loading...</h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <div className="order_detils space-y-3">
            {userInfo && userInfo.isAdmin ? (
              <Link
                className="bg-black text-white px-6 py-2"
                to={'/admin/orders/'}
              >
                <i class="fa-solid fa-angle-left"></i> Back to Orders
              </Link>
            ) : null}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl">Order #{order._id} </h2>
              <div className="flex space-x-3 items-center">
                <button className="border border-gray-400 px-3 py-1 rounded-md">
                  invoice
                </button>
                {order.isPaid ? (
                  ''
                ) : (
                  <>
                    {sdkReady ? (
                      <>
                        {loadingPay ? (
                          'Loading...'
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </>
                    ) : (
                      'Loading...'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="">
              <p className="text-lg">Name: {order.user.name}</p>
              <a href={`mailto:${order.user.email}`}>
                Email: {order.user.email}
              </a>
            </div>
            <div className="flex items-center space-x-5">
              <p>Order date: {order.createdAt.substring(0, 10)}</p>
              <p>Order status: {order.isDelivered ? 'Delivered' : 'Pending'}</p>
            </div>
            <hr />
            <div className="flex flex-col items space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.product} className="single-item flex space-x-4">
                  <img src={item.image} alt={item.name} className="w-24" />
                  <div className="w-full flex justify-between">
                    <div className="space-y-3">
                      <Link to={`/product/${item.product}`}>
                        <h3 className="text-xl">{item.name}</h3>
                      </Link>
                      <p>${addDecimal(item.price)}</p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl ">
                        ${addDecimal(item.price * item.qty)}
                      </h3>
                      <p>Qty: {item.qty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <p>Shipping</p>
              <p>
                {order.shippingPrice === 0
                  ? 'Shipping Free'
                  : `$${addDecimal(order.shippingPrice)}`}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tax</p>
              <p>${addDecimal(order.taxPrice)}</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl">Total</h3>
              <h3 className="text-xl">${addDecimal(order.totalPrice)}</h3>
            </div>
            <hr />
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="">
                <h3 className="text-xl">Payment</h3>
                <p>Status: {order.isPaid ? 'Paid' : 'Not Paid'} </p>
                <p>Method: {order.paymentMethod} </p>
              </div>
              <div className="">
                <h3 className="text-xl">Delivery</h3>
                <p>
                  Status: {order.isDelivered ? 'Delivered' : 'Not Delivered'}{' '}
                </p>
                <p>Address: </p>
                <p>
                  {order.shippingAddress.address} , {order.shippingAddress.city}{' '}
                  ,{order.shippingAddress.state}, {order.shippingAddress.zip},{' '}
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderScreen
