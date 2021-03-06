import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productEditReducer,
  productListReducer,
  productReviewReducer,
} from './reducers/productReducers'
import {
  userDeleteReducer,
  userEditReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers'

import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderUserListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productEdit: productEditReducer,
  productCreate: productCreateReducer,
  productReview: productReviewReducer,
  cart: cartReducer,
  user: userLoginReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  register: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userEdit: userEditReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderUserList: orderUserListReducer,
  orderList: orderListReducer,
  orderDelivery: orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  user: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
