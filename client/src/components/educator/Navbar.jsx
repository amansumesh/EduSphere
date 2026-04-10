import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { UserButton, useUser } from '@clerk/clerk-react';

const Navbar = ({ bgColor, showSidebar, setShowSidebar }) => {

  const { isEducator } = useContext(AppContext)
  const { user } = useUser()

  return user && (
    <div className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3.5 
      ${bgColor || 'bg-[#0b0b0f]/60'} backdrop-blur-xl border-b border-white/5 transition-all duration-300`}>
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2.5 hover:bg-white/5 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/10 group active:scale-90"
          aria-label="Toggle Sidebar"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute left-0 w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-300 transform 
              ${showSidebar ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-2 w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-300 
              ${showSidebar ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
            <span className={`absolute left-0 w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-300 transform 
              ${showSidebar ? 'top-2 -rotate-45' : 'top-4'}`} />
          </div>
        </button>
        
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={assets.logo} alt="Logo" className="h-9 w-auto hover:brightness-110 transition-all duration-300" />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className='max-sm:hidden flex flex-col items-end'>
          <p className='text-[10px] text-brand-purple-400 font-bold uppercase tracking-[2px] mb-0.5'>Welcome Back</p>
          <p className='text-sm font-semibold text-white/90'>{user.fullName}</p>
        </div>
        
        <div className="h-8 w-px bg-white/10 max-sm:hidden"></div>

        <div className="p-0.5 bg-gradient-to-tr from-brand-purple-500/20 to-brand-pink-500/20 rounded-full hover:shadow-[0_0_15px_rgba(124,58,237,0.25)] transition-all duration-500">
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-10 h-10 border border-white/10 group-hover:border-white/20 transition-all',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;