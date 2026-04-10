import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="w-full py-3 border-t border-white/5 bg-[#0b0b0f]/30 backdrop-blur-sm flex items-center justify-center">
      <p className="text-[11px] font-medium tracking-widest text-gray-500 uppercase">
        2025 © <span className="text-gray-300">EduSphere</span> All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;