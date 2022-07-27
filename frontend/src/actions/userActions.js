import axios from 'axios'
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('__paypal_storage__')
  localStorage.removeItem('__belter_experiment_storage__')
  dispatch({ type: USER_LOGOUT_REQUEST })
}

export const register =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        { name, email, password, confirmPassword },
        config
      )

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const update =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.put(
        '/api/users/profile',
        { name, email, password, confirmPassword },
        config
      )

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get('/api/users', config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const edit =
  ({ id, name, email, password, confirmPassword, isAdmin }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_EDIT_REQUEST })
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.put(
        `/api/users/${id}`,
        { name, email, password, confirmPassword, isAdmin },
        config
      )

      dispatch({ type: USER_EDIT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
