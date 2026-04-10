import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import { useSearchParams } from 'react-router-dom';

const StudentsEnrolled = () => {

  const { backendUrl, getToken, isEducator } = useContext(AppContext)
  const [searchParams] = useSearchParams();
  const courseFilter = searchParams.get('course');

  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken()

      const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents()
    }
  }, [isEducator])

  const filteredStudents = enrolledStudents && courseFilter
    ? enrolledStudents.filter(item => item.courseTitle === courseFilter)
    : enrolledStudents;

  return enrolledStudents ? (
    <div className='min-h-screen md:p-8 p-4 pt-8 '>
        <div className='mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                    {courseFilter ? `Students in "${courseFilter}"` : 'Enrolled Students'}
                </h1>
                <p className='text-gray-400 mt-1'>
                    {courseFilter 
                        ? `Viewing students specifically enrolled in this course.`
                        : 'View and manage students enrolled across all your courses.'
                    }
                </p>
            </div>
            {courseFilter && (
                <button 
                    onClick={() => navigate('/educator/student-enrolled')}
                    className='text-sm text-brand-purple-400 hover:text-brand-purple-300 font-medium'
                >
                    ← View all students
                </button>
            )}
        </div>

      <div className="flex flex-col items-center w-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <table className="table-fixed md:table-auto w-full overflow-hidden">
          <thead className="text-white border-b border-white/10 text-sm text-left bg-white/5">
            <tr>
              <th className="px-6 py-4 font-semibold text-center hidden sm:table-cell">#</th>
              <th className="px-6 py-4 font-semibold">Student</th>
              <th className="px-6 py-4 font-semibold">Course Title</th>
              <th className="px-6 py-4 font-semibold hidden sm:table-cell">Enrolled On</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-300">
            {filteredStudents.map((item, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-center hidden sm:table-cell font-medium text-gray-500">{index + 1}</td>
                <td className="md:px-6 px-4 py-4 flex items-center space-x-4">
                  <div className='relative'>
                    <img
                        src={item.student?.imageUrl || assets.user_icon}
                        alt=""
                        className="w-10 h-10 rounded-full border border-white/10 object-cover"
                    />
                    {item.student && <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0b0b0f] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]' />}
                  </div>
                  <span className="font-medium text-white">{item.student?.name || 'Deleted User'}</span>
                </td>
                <td className="px-6 py-4">
                    <span className='px-3 py-1 rounded-full bg-brand-purple-500/10 text-brand-purple-400 border border-brand-purple-500/20 text-xs font-semibold'>
                        {item.courseTitle}
                    </span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell text-gray-400">{new Date(item.purchaseDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
            <div className='py-20 text-center w-full'>
                <p className='text-gray-500'>No students found for this filter.</p>
            </div>
        )}
      </div>
    </div>
  ) : <Loading />
};

export default StudentsEnrolled;