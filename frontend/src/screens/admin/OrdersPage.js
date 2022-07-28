import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deliveredOrder, listOrders } from '../../actions/orderActions'
import { logout } from '../../actions/userActions'
import Loading from '../../components/Loading'

const OrdersPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfo)
  const orderList = useSelector((state) => state.orderList)
  const { orders, loading, error } = orderList

  const orderDelivery = useSelector((state) => state.orderDelivery)
  const {
    loading: loadingDelivery,
    success: successDelivery,
    error: errorDelivery,
  } = orderDelivery

  //   const viewOrder = (order) => {
  //     navigate(`/order/${order._id}`)
  //   }
  const markDelivered = (order) => {
    dispatch(deliveredOrder(order._id, { isDelivered: true }))
  }

  useEffect(() => {
    if (error === 'jwt expired') {
      toast.error('Session expired. Please login again')
      dispatch(logout())
      navigate('/login')
    }

    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/')
    }
    if (successDelivery) {
      toast.success('Order marked as delivered')
    }
    if (errorDelivery) {
      toast.error(errorDelivery)
    }
  }, [userInfo, dispatch, navigate, error, successDelivery, errorDelivery])

  return (
    <div className="bg-white">
      <Helmet>
        <title>Orders | Ecommerce </title>
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
        <h1 className="text-xl">Orders</h1>

        {loading ? (
          <Loading />
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <>
            {orders.length > 0 ? (
              <div className="overflow-x-auto relative shadow-md mt-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        ID
                      </th>
                      <th scope="col" className="py-3 px-6">
                        User
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Date
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Total
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Paid
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Delivered
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {order._id}
                        </th>
                        <td className="py-4 px-6">{order.user.name}</td>
                        <td className="py-4 px-6">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="py-4 px-6">${order.totalPrice}</td>
                        <td className="py-4 px-6">
                          {order.isPaid ? 'Paid' : 'Unpaid'}
                        </td>
                        <td className="py-4 px-6">
                          {order.isDelivered ? 'Delivered' : 'Proccesing'}
                        </td>
                        <td className="py-4 px-6 flex space-x-4">
                          {order.isPaid && !order.isDelivered ? (
                            <button
                              disabled={loadingDelivery}
                              onClick={(e) => markDelivered(order)}
                              title="Mark as Delivered"
                            >
                              <i className="fa-solid fa-circle-check"></i>
                            </button>
                          ) : null}
                          {!order.isDelivered && (
                            <button title="Cancel order">
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          )}
                          <Link to={`/order/${order._id}`}>
                            <button title="View Order">
                              <i className="fa-solid fa-eye"></i>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h3>No orders yet</h3>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
