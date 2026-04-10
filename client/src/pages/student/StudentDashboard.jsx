import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const StudentDashboard = () => {
  const { userData, enrolledCourses, calculateCourseDuration, calculateNoOfLectures } = useContext(AppContext);
  const [stats, setStats] = useState({
    enrolledCount: 0,
    completedCount: 0,
    totalLectures: 0
  });

  useEffect(() => {
    if (enrolledCourses) {
      setStats({
        enrolledCount: enrolledCourses.length,
        completedCount: 0, // Placeholder as progress is fetched separately usually
        totalLectures: enrolledCourses.reduce((acc, course) => acc + calculateNoOfLectures(course), 0)
      });
    }
  }, [enrolledCourses]);

  return userData && (
    <div className='p-4 md:p-8 space-y-8'>
      {/* Welcome Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
            Welcome back, {userData.name}!
          </h1>
          <p className='text-gray-400 mt-1'>Keep learning and reach your goals.</p>
        </div>
        <NavLink to="/course-list" className='btn-gradient px-6 py-2.5 rounded-xl text-sm font-medium w-max'>
          Browse New Courses
        </NavLink>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {[
          { label: 'Enrolled Courses', value: stats.enrolledCount, icon: assets.my_course_icon, color: 'purple' },
          { label: 'Completed Lectures', value: stats.completedCount, icon: assets.person_tick_icon, color: 'pink' },
          { label: 'Available Lectures', value: stats.totalLectures, icon: assets.home_icon, color: 'blue' }
        ].map((stat, idx) => (
          <div key={idx} className='bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex items-center gap-5 group hover:border-white/20 transition-all'>
            <div className={`p-4 rounded-2xl bg-brand-${stat.color}-500/20 text-brand-${stat.color}-400 group-hover:scale-110 transition-transform`}>
               <img src={stat.icon} className='w-6 h-6' style={{filter: 'brightness(0) invert(1)'}} alt="" />
            </div>
            <div>
              <p className='text-gray-400 text-sm font-medium'>{stat.label}</p>
              <p className='text-2xl font-bold text-white'>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Courses / Continue Learning */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Recently Enrolled</h2>
          <NavLink to="/student/my-enrollments" className='text-brand-purple-400 text-sm hover:underline font-medium'>View All</NavLink>
        </div>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {enrolledCourses.slice(0, 4).map((course, index) => (
            <div key={index} className='bg-white/5 border border-white/10 p-4 rounded-3xl flex gap-4 group hover:bg-white/[0.07] transition-all cursor-pointer' onClick={() => window.location.href = `/player/${course._id}`}>
              <img src={course.courseThumbnail} className='w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover' alt="" />
              <div className='flex-1 py-1 flex flex-col justify-between'>
                <div>
                  <h3 className='font-bold text-lg line-clamp-1 group-hover:text-brand-purple-400 transition-colors'>{course.courseTitle}</h3>
                  <p className='text-gray-400 text-sm mt-1'>{calculateNoOfLectures(course)} Lectures • {calculateCourseDuration(course)}</p>
                </div>
                
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs font-medium'>
                    <span className='text-gray-400'>Progress</span>
                    <span className='text-white'>0%</span>
                  </div>
                  <div className='w-full h-1.5 bg-white/10 rounded-full overflow-hidden'>
                    <div className='h-full bg-brand-purple-500 rounded-full w-0 transition-all duration-1000'></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {enrolledCourses.length === 0 && (
             <div className='col-span-full py-12 text-center bg-white/5 border border-white/10 border-dashed rounded-3xl'>
                <p className='text-gray-400'>You haven't enrolled in any courses yet.</p>
                <NavLink to="/course-list" className='text-brand-purple-400 mt-2 inline-block font-medium'>Start learning today!</NavLink>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
