import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {

  const location = useLocation();

  const isCoursesListPage = location.pathname.includes('/course-list');

  const { backendUrl, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext)

  const { openSignIn } = useClerk()
  const { user } = useUser()


  return (
    <div className={`flex items-center justify-between px-4 border-b border-white/10 py-4 ${isCoursesListPage ? 'bg-brand-black/80' : 'bg-brand-black/80'} backdrop-blur shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)]`}>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
      <div className="md:flex hidden items-center gap-5 text-gray-200">
        <div className="flex items-center gap-5">
          {
            user && <>
              {isEducator
                ? <>
                  <Link to='/educator' className="hover:text-brand-pink-300 transition-colors text-sm">Dashboard</Link>
                  <Link to='/educator/my-courses' className="hover:text-brand-pink-300 transition-colors text-sm">My Courses</Link>
                </>
                : <>
                  <Link to='/student' className="hover:text-brand-purple-300 transition-colors text-sm">Dashboard</Link>
                  <Link to='/student/my-enrollments' className="hover:text-brand-purple-300 transition-colors text-sm">My Enrollments</Link>
                </>
              }
            </>
          }
        </div>
        {user
          ? <UserButton />
          : <button onClick={() => openSignIn()} className="btn-gradient px-5 py-2 rounded-full">
            Sign In / Register
          </button>}
      </div>
      {/* For Phone Screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-200'>
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {
            user && (isEducator
              ? <Link to='/educator/my-courses' className='hover:text-brand-pink-300'>Dashboard</Link>
              : <Link to='/student' className='hover:text-brand-purple-300'>Dashboard</Link>
            )
          }
        </div>
        {user
          ? <UserButton />
          : <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" style={{ filter: 'invert(50%) sepia(90%) saturate(1000%) hue-rotate(270deg) brightness(1.2)' }} />
          </button>}
      </div>
    </div>
  );
};

export default Navbar;