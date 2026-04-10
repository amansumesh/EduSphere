import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Footer = () => {
  const { navigate } = useContext(AppContext);

  return (
    <footer className="w-full mt-24 border-t border-white/5 bg-brand-black/20 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-6">
          <img src={assets.logo} alt="logo" className="h-8" />
          <div className="hidden md:block w-px h-5 bg-white/10"></div>
          <p className="text-gray-500 text-sm">
            © 2025 EduSphere. All rights reserved.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-gray-400 font-medium">
          <button onClick={() => navigate('/course-list')} className="hover:text-brand-purple-400 transition-colors">Course List</button>
          <a href="#" className="hover:text-brand-purple-400 transition-colors">Privacy Policy</a>
          <a href="https://github.com/amansumesh" target='_blank' className="hover:text-brand-purple-400 transition-colors">Contact</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
