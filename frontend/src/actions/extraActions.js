import { HIDE_CART, SHOW_CART } from '../constants/extraConstants'

export const showCart = () => async (dispatch, getState) => {
  console.log('showCartAction')

  dispatch({
    type: SHOW_CART,
    payload: {
      showCart: true,
    },
  })
  localStorage.setItem('showDrawer', 'true')
}
export const hideCart = () => async (dispatch) => {
  dispatch({
    type: HIDE_CART,
    payload: {
      showCart: false,
    },
  })
  localStorage.setItem('showDrawer', 'true')
}
