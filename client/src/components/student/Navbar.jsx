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

  const becomeEducator = async () => {

    try {

      if (isEducator) {
        navigate('/educator')
        return;
      }

      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        setIsEducator(true)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={`flex items-center justify-between px-4 border-b border-white/10 py-4 ${isCoursesListPage ? 'bg-brand-black/80' : 'bg-brand-black/80'} backdrop-blur shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)]`}>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
      <div className="md:flex hidden items-center gap-5 text-gray-200">
        <div className="flex items-center gap-5">
          {
            user && <>
              <button onClick={becomeEducator} className="hover:text-brand-pink-300 transition-colors">{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
              | <Link to='/my-enrollments' className="hover:text-brand-purple-300 transition-colors">My Enrollments</Link>
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
          <button onClick={becomeEducator} className="hover:text-brand-pink-300">{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
          | {
            user && <Link to='/my-enrollments' className='hover:text-brand-purple-300'>My Enrollments</Link>
          }
        </div>
        {user
          ? <UserButton />
          : <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" style={{ filter: 'invert(50%) sepia(90%) saturate(1000%) hue-rotate(270deg) brightness(1.2)' }}/>
          </button>}
      </div>
    </div>
  );
};

export default Navbar;