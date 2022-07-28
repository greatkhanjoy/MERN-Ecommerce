import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const SearchBox = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex space-x-2">
      <input
        className=""
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
        placeholder="Search product..."
      />
      <button
        type="submit"
        className="px-6 py-2 text-white bg-gray-800 border border-black"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBox
