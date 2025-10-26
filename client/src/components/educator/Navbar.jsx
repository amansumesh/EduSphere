import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { UserButton, useUser } from '@clerk/clerk-react';

const Navbar = ({ bgColor }) => {

  const { isEducator } = useContext(AppContext)
  const { user } = useUser()

  return isEducator && user && (
    <div className={`flex items-center justify-between px-4 md:px-8 border-b border-white/10 py-3 ${bgColor}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
      </Link>
      <div className="flex items-center gap-5 text-gray-300 relative">
        <p>Hi! {user.fullName}</p>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;