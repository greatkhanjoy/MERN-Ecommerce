import { HIDE_CART, SHOW_CART } from '../constants/extraConstants'

export const showCartReducer = (state, action) => {
  switch (action.type) {
    case SHOW_CART:
      return state
    default:
      return state
  }
}

export const hideCartReducer = (state, action) => {
  switch (action.type) {
    case HIDE_CART:
      return state
    default:
      return state
  }
}
