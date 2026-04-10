import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LayoutDashboard, BookOpen, User } from 'lucide-react';

const Navbar = () => {

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { isEducator, navigate } = useContext(AppContext)
  const { openSignIn } = useClerk()
  const { user } = useUser()

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-brand-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Logo"
          className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
        />

        <div className="md:flex hidden items-center gap-8">
          <div className="flex items-center gap-8 text-gray-300 font-medium">
            {user && (
              isEducator ? (
                <>
                  <Link to='/educator' className="flex items-center gap-2 hover:text-white transition-colors text-sm">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link to='/educator/my-courses' className="flex items-center gap-2 hover:text-white transition-colors text-sm">
                    <BookOpen size={18} /> My Courses
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/student' className="flex items-center gap-2 hover:text-white transition-colors text-sm">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link to='/student/my-enrollments' className="flex items-center gap-2 hover:text-white transition-colors text-sm">
                    <BookOpen size={18} /> My Enrollments
                  </Link>
                </>
              )
            )}
            <Link to='/course-list' className="hover:text-white transition-colors text-sm">Courses</Link>
          </div>

          <div className="h-6 w-[1px] bg-white/10 mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-10 h-10 border border-white/20' } }} />
            </div>
          ) : (
            <button
              onClick={() => openSignIn()}
              className="btn-gradient px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-purple-500/20 hover:scale-105 transition-all"
            >
              Sign In / Register
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center gap-4'>
          {user ? (
            <UserButton />
          ) : (
            <button onClick={() => openSignIn()} className="p-2 glass rounded-lg">
              <User size={20} className="text-brand-purple-400" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
