import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Header from './components/Header'
import CartDrawer from './components/utill/CartDrawer'
import CartScreen from './screens/cartScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import Profile from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  const [openDrawerState, setopenDrawerState] = useState(false)
  const openDrawer = () => {
    setopenDrawerState(!openDrawerState)
  }
  return (
    <Router>
      <CartDrawer action={openDrawer} toggle={openDrawerState} />

      <Header action={openDrawer} />

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<HomeScreen />} exact />
          <Route
            path="/product/:id"
            element={<ProductScreen action={openDrawer} />}
          />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </Router>
  )
}

export default App
