import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Star } from 'lucide-react';

const CourseCard = ({ course }) => {

    const { currency, calculateRating } = useContext(AppContext)

    return (
        <Link 
            onClick={() => scrollTo(0, 0)} 
            to={'/course/' + course._id} 
            className="group block card-dark rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
            <div className="relative aspect-video overflow-hidden">
                <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={course.courseThumbnail} 
                    alt={course.courseTitle} 
                />
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-pink-400 transition-colors">
                    {course.courseTitle}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{course.educator.name}</p>
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center text-yellow-500">
                             <Star size={14} fill="currentColor" />
                             <span className="ml-1 text-sm font-bold text-white">{calculateRating(course)}</span>
                        </div>
                        <span className="text-gray-500 text-xs">({course.courseRatings.length})</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {currency}{(course.coursePrice - (course.discount || 0) * course.coursePrice / 100).toFixed(2)}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard