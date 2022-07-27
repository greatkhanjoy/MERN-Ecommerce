import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteUser, edit, getUsers, logout } from '../actions/userActions'
import Loading from '../components/Loading'
const UsersScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { users, loading, error } = userList

  const user = useSelector((state) => state.user)
  const { userInfo } = user

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = userDelete

  const userEdit = useSelector((state) => state.userEdit)
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = userEdit

  const deleteUserHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(null)
  const [userId, setUserId] = useState('')

  const editHandler = (user) => {
    const popup = document.querySelector('.popup-form')
    popup.classList.add('active-popup')
    setEmail(user.email)
    setName(user.name)
    setIsAdmin(user.isAdmin)
    setUserId(user._id)
  }

  const formHandler = (e) => {
    e.preventDefault()
    if (!name || !email || isAdmin === null) {
      toast.error('Please fill all the fields')
      return
    }
    if (password.length > 0 && password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    dispatch(
      edit({ id: userId, name, email, password, confirmPassword, isAdmin })
    )
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
      dispatch(getUsers())
    } else {
      navigate(-1)
    }

    if (successDelete) {
      toast.success('User deleted successfully!')
    } else if (errorDelete) {
      toast.error(errorDelete)
    }
    if (successEdit) {
      const popup = document.querySelector('.popup-form')
      popup.classList.remove('active-popup')
      toast.success('User updated successfully!')
    }
    if (errorEdit) {
      toast.error(errorEdit)
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    errorDelete,
    error,
    successEdit,
    errorEdit,
  ])

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto  px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl py-4 ">Users</h2>
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
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Admin
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
                {!users && users.length <= 0 ? (
                  <tr>
                    <td className="text-center text-xl">No user found!</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 "
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user._id}
                      </th>
                      <td className="py-4 px-6">{user.name}</td>
                      <td className="py-4 px-6">{user.email}</td>
                      <td className="py-4 px-6">
                        {user.isAdmin ? (
                          <i title="Admin" className="fa-solid fa-check"></i>
                        ) : (
                          <i
                            title="User"
                            className="fa-solid fa-xmark text-red-600"
                          ></i>
                        )}
                      </td>
                      <td className="py-4 px-6 space-x-4">
                        <button
                          onClick={() => {
                            editHandler(user)
                          }}
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen-to-square text-purple-500"></i>
                        </button>
                        <button
                          disabled={loadingDelete}
                          onClick={() => {
                            deleteUserHandler(user._id)
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
          <h2 className="text-lg text-center">Edit User</h2>
          <form
            onSubmit={(e) => formHandler(e)}
            className="flex flex-col space-y-4"
            id="editForm"
          >
            <input type="hidden" value={userId} />
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
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="isAdmin">Is Admin? *</label>
              <select
                id="isAdmin"
                onChange={(e) => setIsAdmin(e.target.value)}
                required
              >
                <option selected={isAdmin ? true : false} value={true}>
                  Yes
                </option>
                <option selected={isAdmin ? false : true} value={false}>
                  No
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {password.length > 0 && (
              <div className="flex flex-col space-y-1">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
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
