import React from 'react'
import { Link } from 'react-router-dom'

const RecommendedCourses = ({ title = 'Recommended Courses', note = '', courses = [] }) => {
  if (!courses || courses.length === 0) return null

  return (
    <div className='mt-10'>
      <div className='flex items-center gap-3 mb-4'>
        <h2 className='text-xl font-semibold text-white'>{title}</h2>
        {note && (
          <div className='flex items-center gap-2 px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-300 text-xs'>
            <span className='inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-white text-[10px] font-bold'>i</span>
            <span className='truncate'>{note}</span>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {courses.map((course) => (
          <Link key={course._id} to={`/course/${course._id}`} onClick={() => scrollTo(0,0)} className="border border-white/10 bg-white/5 overflow-hidden rounded-lg">
            <img className="w-full aspect-video object-cover" src={course.courseThumbnail} alt={course.courseTitle} />
            <div className="p-3 text-left">
              <h3 className="text-base font-semibold text-white truncate">{course.courseTitle}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecommendedCourses


