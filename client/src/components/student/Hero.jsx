import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from '../../components/student/SearchBar';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center w-full md:pt-20 pt-10 px-7 md:px-0 space-y-7 text-center">
      <div className="absolute inset-0 bg-brand-gradient -z-10 opacity-50" />


      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:text-7xl text-4xl relative font-bold text-white max-w-4xl mx-auto leading-tight"
      >
        Your future, your way: discover the perfect course to <span className="text-gradient">ignite success.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
      >
        We bring together world-class educators, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-2xl mx-auto pt-4"
      >
        <SearchBar />
      </motion.div>
    </div>
  );
};

export default Hero;
