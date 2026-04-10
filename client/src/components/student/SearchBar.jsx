import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react';

const SearchBar = ({ data }) => {

  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }

  return (
    <form onSubmit={onSearchHandler} className="max-w-xl w-full md:h-16 h-14 flex items-center glass-dark rounded-full p-1.5 focus-within:border-brand-purple-400/50 focus-within:ring-2 focus-within:ring-brand-purple-500/20 hover:border-white/10 transition-all duration-300 group shadow-2xl shadow-black/40">
      <div className="pl-6 pr-3 text-gray-500 group-focus-within:text-brand-purple-400 transition-colors">
         <Search size={22} />
      </div>
      <input 
        onChange={e => setInput(e.target.value)} 
        value={input} 
        type="text" 
        className="w-full h-full outline-none text-white placeholder-gray-500 bg-transparent text-lg font-medium" 
        placeholder="Search for courses..." 
      />
      <button 
        type='submit' 
        className="btn-gradient rounded-full text-white font-bold md:px-10 px-8 h-full transition-all active:scale-95 shadow-lg shadow-brand-purple-500/20 active:shadow-inner"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar