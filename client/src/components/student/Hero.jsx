import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from '../../components/student/SearchBar';

const Hero = () => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-brand-purple-900/30 to-transparent">
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-white max-w-3xl mx-auto">
        Your future, your way: discover the perfect course to ignite your
        <span className="text-brand-pink-400"> journey to success.</span>
        <img src={assets.sketch} alt="sketch" className="md:block hidden absolute -bottom-7 right-0 filter hue-rotate-[300deg] brightness-125" />
      </h1>
      <p className="md:block hidden text-gray-300 max-w-2xl mx-auto">
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </p>
      <p className="md:hidden text-gray-300 max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your professional goals.
      </p>
      <SearchBar />
      {/* floating edu icons */}
      <img src={assets.book_icon || assets.lesson_icon} alt="book" className="pointer-events-none select-none hidden md:block absolute -left-10 top-10 w-24 opacity-20 animate-float-slow" />
      <img src={assets.time_clock_icon} alt="clock" className="pointer-events-none select-none hidden md:block absolute right-10 top-24 w-16 opacity-20 animate-float" />
      <img src={assets.person_tick_icon} alt="graduation" className="pointer-events-none select-none hidden md:block absolute left-1/3 -bottom-10 w-20 opacity-20 animate-float-delay" />
    </div>
  );
};

export default Hero;
