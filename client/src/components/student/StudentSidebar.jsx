import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const StudentSidebar = ({ showSidebar }) => {
  const { userData } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/student', icon: assets.home_icon },
    { name: 'My Enrollments', path: '/student/my-enrollments', icon: assets.my_course_icon },
    { name: 'All Courses', path: '/student/course-list', icon: assets.search_icon },
  ];

  if (!userData) return null;

  return (
    <div className={`transition-all duration-500 ease-in-out border-r border-white/5 flex flex-col bg-[#0b0b0f]/50 backdrop-blur-xl sticky top-0 left-0 h-screen overflow-hidden
      ${showSidebar ? 'md:w-72 w-20 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full'}
    `}>
      <div className="flex-1 py-8 px-4 space-y-3 min-w-[280px]">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/student'}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
              ${isActive 
                ? 'bg-gradient-to-r from-brand-purple-500/20 to-brand-pink-500/10 border border-white/10 text-white shadow-[0_0_20px_rgba(124,58,237,0.15)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center
                  ${isActive ? 'bg-brand-purple-500/30' : 'bg-white/5'}
                `}>
                  <img 
                    src={item.icon} 
                    alt={item.name} 
                    className="w-5 h-5 transition-all duration-300"
                    style={{
                      filter: isActive ? 'brightness(0) invert(1)' : 'brightness(0) invert(1) opacity(0.5)',
                    }}
                  />
                </div>

                <span className='md:block hidden font-medium tracking-wide whitespace-nowrap transition-all duration-300'>
                  {item.name}
                </span>

                <div className={`md:block hidden ml-auto w-1.5 h-1.5 rounded-full transition-all duration-500
                  ${isActive ? 'bg-brand-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.85)] opacity-100 scale-100' : 'opacity-0 scale-0'}
                `} />
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-purple-500/5 to-transparent pointer-events-none opacity-40 rounded-b-3xl" />
    </div>
  );
};

export default StudentSidebar;
