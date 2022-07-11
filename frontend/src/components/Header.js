import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import UserMenu from './utill/UserMenu'

const Header = ({ action }) => {
  const location = useLocation()
  const user = useSelector((state) => state.user)
  const { userInfo } = user

  return (
    <header>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <h2 className="text-purple-200 text-3xl font-semibold">
                    Ecommerce
                  </h2>
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to={'/'}
                    className={` ${
                      location.pathname === '/' ? 'bg-gray-900' : ''
                    } text-white px-3 py-2 rounded-md text-sm font-medium`}
                    aria-current="page"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to={'/cart'}
                    className={` ${
                      location.pathname === '/cart' ? 'bg-gray-900' : ''
                    } text-white px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Cart
                  </Link>
                  <Link
                    to={'/checkout'}
                    className={` ${
                      location.pathname === '/checkout' ? 'bg-gray-900' : ''
                    } text-white px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
            <div className=" flex items-center space-x-4">
              <button onClick={action} className="text-white">
                <i className="fa-solid fa-cart-shopping mr-1"></i>
                Cart
              </button>
              {!userInfo ? (
                <Link
                  to={'/login'}
                  className="bg-gray-800 p-1 rounded-full text-white hover:text-white focus:outline-none "
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
                </Link>
              ) : (
                <UserMenu user={userInfo} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu  */}
      </nav>
    </header>
  )
}

export default Header
