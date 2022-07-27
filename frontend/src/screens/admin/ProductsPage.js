import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteProduct, edit, listProducts } from '../../actions/productActions'
import { logout } from '../../actions/userActions'
import Loading from '../../components/Loading'
import RichTextEditor from '../../components/utill/RichTextEditor'
const UsersScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete

  const productEdit = useSelector((state) => state.productEdit)
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = productEdit

  const user = useSelector((state) => state.user)
  const { userInfo } = user

  const deleteProductHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this Product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [ProductId, setProductId] = useState('')
  const [description, setDescription] = useState('')

  const editHandler = (product) => {
    const popup = document.querySelector('.popup-form')
    popup.classList.add('active-popup')
    setProductId(product._id)
    setPrice(product.price)
    setName(product.name)
    setCategory(product.category)
    setBrand(product.brand)
    setDescription(product.description)
  }

  const formHandler = (e) => {
    e.preventDefault()
    if (!name || !price || !category || !brand) {
      toast.error('Please fill all the fields')
      return
    }

    dispatch(edit({ id: ProductId, name, price, category, brand, description }))
  }

  const closePopUp = () => {
    const popup = document.querySelector('.popup-form')
    popup.classList.remove('active-popup')
  }

  useEffect(() => {
    if (error === 'jwt expired') {
      toast.error('Session expired. Please login again')
      dispatch(logout())
      navigate('/login')
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      navigate(-1)
    }
    if (successDelete) {
      toast.success('Product deleted successfully')
    }
    if (errorDelete) {
      toast.error(errorDelete)
    }
    if (successEdit) {
      toast.success('Product updated successfully')
      closePopUp()
    }
    if (errorEdit) {
      toast.error(errorEdit)
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    error,
    errorDelete,
    successDelete,
    successEdit,
    errorEdit,
  ])

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto  px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl py-4 ">Products</h2>
        <div className="overflow-x-auto relative shadow-md">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Category
                </th>
                <th scope="col" className="py-3 px-6">
                  Brand
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td>
                    <Loading />
                  </td>
                </tr>
              </tbody>
            ) : error ? (
              <tbody>
                <tr>
                  <td className="text-center py-3">
                    <h3 className="text-xl">{error}</h3>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {!products && products.length <= 0 ? (
                  <tr>
                    <td className="text-center text-xl">No Product Found!</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 "
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product._id}
                      </th>
                      <td className="py-4 px-6">{product.name}</td>
                      <td className="py-4 px-6">{product.price}</td>
                      <td className="py-4 px-6">{product.category}</td>
                      <td className="py-4 px-6">{product.brand}</td>
                      <td className="py-4 px-6 space-x-4">
                        <button
                          onClick={() => {
                            editHandler(product)
                          }}
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen-to-square text-purple-500"></i>
                        </button>
                        <button
                          disabled={loadingDelete}
                          onClick={() => {
                            deleteProductHandler(product._id)
                          }}
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash text-red-600"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div className="popup-form fixed w-full h-screen top-0 bg-[#57535380] to-transparent">
        <div className="popup-form-content bg-white rounded-sm m-auto w-[450px] p-5 overflow-auto flex-col flex md:mt-[5%] space-y-4 relative">
          <button
            onClick={() => {
              closePopUp()
            }}
            className="absolute top-1 right-3"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2 className="text-lg text-center">Edit Product</h2>
          <form
            onSubmit={(e) => formHandler(e)}
            className="flex flex-col space-y-4"
            id="editForm"
          >
            <input type="hidden" value={ProductId} />
            <div className="flex flex-col space-y-1">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="description">Description *</label>
              <RichTextEditor setValue={setDescription} content={description} />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">Price *</label>
              <input
                type="number"
                placeholder="Price"
                id="price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option disabled> Select Category</option>
                <option> Category 1</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="brand">Brand *</label>
              <select
                id="brand"
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option disabled> Select Brand</option>
                <option> Brand 1</option>
              </select>
            </div>
            <div className="flex space-x-4 justify-center">
              <button
                type="submit"
                className="bg-[#32CD32] text-white px-6 py-2"
                disabled={loadingEdit}
              >
                {loadingEdit ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  closePopUp()
                }}
                type="button"
                className="bg-black text-white px-6 py-2"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UsersScreen
