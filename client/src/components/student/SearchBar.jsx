import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {

  const navigate = useNavigate()

  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()

    navigate('/course-list/' + input)

  }

  return (
    <form onSubmit={onSearchHandler} className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white/5 border border-white/10 rounded">
      <img className="md:w-auto w-10 px-3" src={assets.search_icon} alt="search_icon" />
      <input onChange={e => setInput(e.target.value)} value={input} type="text" className="w-full h-full outline-none text-gray-200 placeholder-gray-400 bg-transparent" placeholder="Search for courses" />
      <button type='submit' className="bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 hover:from-brand-pink-600 hover:to-brand-purple-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1">Search</button>
    </form>
  )
}

export default SearchBar