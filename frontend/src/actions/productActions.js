import axios from 'axios'
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants'

export const listProducts =
  (keyword = '', limit = 99999) =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    try {
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&limit=${limit}`
      )
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const singleProduct = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST })
  try {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const create = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(`/api/products/`, productData, config)

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const edit = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${productData.id}`,
      productData,
      config
    )

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(`/api/products/${id}`, config)

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_REQUEST })
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(
      `/api/products/${review.id}/reviews`,
      review,
      config
    )

    dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
