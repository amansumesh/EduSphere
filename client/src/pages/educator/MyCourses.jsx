import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)
  const navigate = useNavigate();

  const [courses, setCourses] = useState(null)
  const [editOpenId, setEditOpenId] = useState(null)
  const [editData, setEditData] = useState({ courseTitle: '', coursePrice: 0, discount: 0, tags: [], isPublished: true })
  const [curriculumModalId, setCurriculumModalId] = useState(null)
  const [curriculum, setCurriculum] = useState([])

  const fetchEducatorCourses = async () => {

    try {

      const token = await getToken()

      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` } })

      data.success && setCourses(data.courses)

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  const openEdit = (course) => {
    setEditOpenId((prev) => (prev === course._id ? null : course._id))
    setEditData({
      courseTitle: course.courseTitle || '',
      coursePrice: course.coursePrice || 0,
      discount: course.discount || 0,
      tags: course.tags || [],
      isPublished: course.isPublished !== false
    })
  }

  const saveEdit = async (courseId) => {
    try {
      const token = await getToken()
      const payload = {
        courseTitle: editData.courseTitle,
        coursePrice: Number(editData.coursePrice),
        discount: Number(editData.discount),
        tags: editData.tags,
        isPublished: !!editData.isPublished
      }
      const { data } = await axios.put(`${backendUrl}/api/educator/course/${courseId}`, payload, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success('Course updated')
        setEditOpenId(null)
        fetchEducatorCourses()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const openCurriculumModal = async (courseId) => {
    try {
      setCurriculumModalId(courseId)
      const token = await getToken()
      const { data } = await axios.get(`${backendUrl}/api/educator/course/${courseId}/raw`, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setCurriculum(data.course.courseContent || [])
      } else {
        toast.error(data.message)
        setCurriculumModalId(null)
      }
    } catch (err) {
      toast.error(err.message)
      setCurriculumModalId(null)
    }
  }

  const updateCurriculum = async () => {
    try {
      if (!curriculumModalId) return
      const token = await getToken()
      const { data } = await axios.put(`${backendUrl}/api/educator/course/${curriculumModalId}/curriculum`, { courseContent: curriculum }, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success('Curriculum updated')
        setCurriculumModalId(null)
        fetchEducatorCourses()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const addChapter = () => {
    setCurriculum([
      ...curriculum,
      { chapterId: Date.now().toString(), chapterOrder: curriculum.length + 1, chapterTitle: 'New Chapter', chapterContent: [] }
    ])
  }

  const removeChapter = (idx) => {
    const next = curriculum.slice()
    next.splice(idx, 1)
    setCurriculum(next.map((c, i) => ({ ...c, chapterOrder: i + 1 })))
  }

  const updateChapterField = (idx, field, value) => {
    const next = curriculum.slice()
    next[idx] = { ...next[idx], [field]: value }
    setCurriculum(next)
  }

  const addLectureToChapter = (cIdx) => {
    const next = curriculum.slice()
    const chapter = next[cIdx]
    chapter.chapterContent = chapter.chapterContent || []
    chapter.chapterContent.push({
      lectureId: Date.now().toString(),
      lectureOrder: (chapter.chapterContent[chapter.chapterContent.length - 1]?.lectureOrder || 0) + 1,
      lectureTitle: 'New Lecture',
      lectureDuration: 0,
      lectureUrl: '',
      isPreviewFree: false
    })
    setCurriculum(next)
  }

  const removeLecture = (cIdx, lIdx) => {
    const next = curriculum.slice()
    next[cIdx].chapterContent.splice(lIdx, 1)
    next[cIdx].chapterContent = next[cIdx].chapterContent.map((l, i) => ({ ...l, lectureOrder: i + 1 }))
    setCurriculum(next)
  }

  const updateLectureField = (cIdx, lIdx, field, value) => {
    const next = curriculum.slice()
    const chapter = next[cIdx]
    const lecture = { ...chapter.chapterContent[lIdx], [field]: value }
    chapter.chapterContent[lIdx] = lecture
    setCurriculum(next)
  }

  return courses ? (
    <div className="min-h-screen md:p-8 p-4 pt-8">
      <div className='w-full'>
        <div className='mb-8'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                My Courses
            </h1>
            <p className='text-gray-400 mt-1'>Manage your published and draft courses.</p>
        </div>

        <div className="flex flex-col items-center w-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-white border-b border-white/10 text-sm text-left bg-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold truncate xl:w-1/3">All Courses</th>
                <th className="px-6 py-4 font-semibold truncate">Earnings</th>
                <th className="px-6 py-4 font-semibold truncate">Students</th>
                <th className="px-6 py-4 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 flex items-center space-x-4 truncate">
                    <img src={course.courseThumbnail} alt="Course Image" className="w-16 rounded-lg border border-white/10 shadow-lg" />
                    <div className='flex flex-col truncate'>
                        <span className="truncate font-medium text-white">{course.courseTitle}</span>
                        <span className="text-xs text-gray-500 mt-0.5">Published: {new Date(course.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-medium text-white">
                    {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100)).toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <button 
                        onClick={() => navigate(`/educator/student-enrolled?course=${encodeURIComponent(course.courseTitle)}`)}
                        className="group flex items-center gap-2 hover:text-brand-purple-400 transition-colors"
                    >
                        <span className='font-bold text-white group-hover:text-brand-purple-400'>{course.enrolledStudents.length}</span>
                        <span className='text-xs text-gray-500 group-hover:text-brand-purple-400'>View Details →</span>
                    </button>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(course)} className='p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all'>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                      </button>
                      <button onClick={() => openCurriculumModal(course._id)} className='px-4 py-2 text-xs font-semibold rounded-xl bg-brand-purple-500/10 text-brand-purple-400 border border-brand-purple-500/20 hover:bg-brand-purple-500/20 transition-all'>
                        Curriculum
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {courses.length === 0 && (
              <div className='py-20 text-center w-full'>
                  <p className='text-gray-500'>You haven't added any courses yet.</p>
              </div>
          )}
        </div>
      </div>

      {editOpenId && (
          <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-all'>
              <div className='bg-[#0b0b0f] border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl'>
                  <h3 className='text-xl font-bold mb-6 text-white'>Edit Course Info</h3>
                  <div className='space-y-4'>
                    <div className='space-y-1.5'>
                        <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Title</label>
                        <input value={editData.courseTitle} onChange={(e)=>setEditData({...editData, courseTitle:e.target.value})} className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50 transition-colors' />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Price</label>
                            <input type='number' value={editData.coursePrice} onChange={(e)=>setEditData({...editData, coursePrice:e.target.value})} className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50 transition-colors' />
                        </div>
                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Discount %</label>
                            <input type='number' min={0} max={100} value={editData.discount} onChange={(e)=>setEditData({...editData, discount:e.target.value})} className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50 transition-colors' />
                        </div>
                    </div>
                    <div className='space-y-1.5'>
                        <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Tags</label>
                        <input placeholder='Programming, Web Dev...' value={editData.tags.join(', ')} onChange={(e)=>setEditData({...editData, tags: e.target.value.split(',').map(t=>t.trim()).filter(Boolean)})} className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50 transition-colors' />
                    </div>
                    <label className='flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors'>
                        <input type='checkbox' checked={!!editData.isPublished} onChange={(e)=>setEditData({...editData, isPublished:e.target.checked})} className='w-4 h-4 accent-brand-purple-500' />
                        <span className='text-sm font-medium'>Published (Active)</span>
                    </label>
                  </div>
                  <div className='flex gap-3 justify-end mt-8'>
                    <button onClick={()=>setEditOpenId(null)} className='px-6 py-3 text-sm font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all'>Cancel</button>
                    <button onClick={()=>saveEdit(editOpenId)} className='px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 text-white shadow-lg shadow-brand-purple-500/20 active:scale-95 transition-all'>Update Course</button>
                  </div>
              </div>
          </div>
      )}

      {curriculumModalId && (
        <div className='fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[60] p-4'>
          <div className='bg-[#0b0b0f] border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl'>
            <div className='flex items-center justify-between p-6 border-b border-white/10 bg-white/5'>
              <div>
                <h3 className='text-xl font-bold'>Edit Course Curriculum</h3>
                <p className='text-xs text-gray-400 mt-1'>Organize chapters and video lessons.</p>
              </div>
              <button onClick={()=>setCurriculumModalId(null)} className='p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white'>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className='flex-1 overflow-y-auto p-6 space-y-6'>
              {curriculum.map((chapter, cIdx) => (
                <div key={chapter.chapterId || cIdx} className='bg-white/5 border border-white/5 rounded-2xl p-6 relative group'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='w-10 h-10 rounded-xl bg-brand-purple-500/20 flex items-center justify-center text-brand-purple-400 font-bold border border-brand-purple-500/20'>
                        {cIdx + 1}
                    </div>
                    <input value={chapter.chapterTitle}
                      onChange={(e)=>updateChapterField(cIdx, 'chapterTitle', e.target.value)}
                      className='flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50 transition-colors font-semibold' />
                    <button onClick={()=>removeChapter(cIdx)} className='p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                  <div className='ml-14 space-y-4'>
                    {(chapter.chapterContent||[]).map((lecture, lIdx) => (
                      <div key={lecture.lectureId || lIdx} className='grid grid-cols-12 gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5'>
                        <div className='col-span-12 md:col-span-5 space-y-1'>
                            <label className='text-[10px] font-bold text-gray-500 uppercase'>Lecture Title</label>
                            <input className='w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50' value={lecture.lectureTitle} onChange={(e)=>updateLectureField(cIdx, lIdx, 'lectureTitle', e.target.value)} />
                        </div>
                        <div className='col-span-6 md:col-span-2 space-y-1'>
                             <label className='text-[10px] font-bold text-gray-500 uppercase'>Duration (min)</label>
                            <input type='number' className='w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50' value={lecture.lectureDuration} onChange={(e)=>updateLectureField(cIdx, lIdx, 'lectureDuration', Number(e.target.value))} />
                        </div>
                        <div className='col-span-12 md:col-span-3 space-y-1'>
                            <label className='text-[10px] font-bold text-gray-500 uppercase'>Video URL</label>
                            <input className='w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-brand-purple-500/50' value={lecture.lectureUrl} onChange={(e)=>updateLectureField(cIdx, lIdx, 'lectureUrl', e.target.value)} />
                        </div>
                        <div className='col-span-4 md:col-span-1 flex flex-col items-center justify-center space-y-1'>
                             <label className='text-[10px] font-bold text-gray-500 uppercase'>Free</label>
                            <input type='checkbox' checked={!!lecture.isPreviewFree} onChange={(e)=>updateLectureField(cIdx, lIdx, 'isPreviewFree', e.target.checked)} className='w-4 h-4 accent-brand-purple-500' />
                        </div>
                        <div className='col-span-2 md:col-span-1 flex justify-end'>
                          <button onClick={()=>removeLecture(cIdx, lIdx)} className='p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={()=>addLectureToChapter(cIdx)} className='w-full py-2.5 border-2 border-dashed border-white/10 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:border-brand-purple-500/50 hover:bg-brand-purple-500/5 transition-all text-center'>
                        + Add Lecture to this Chapter
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addChapter} className='w-full py-4 border-2 border-dashed border-brand-purple-500/20 rounded-2xl text-sm font-bold text-brand-purple-400 hover:bg-brand-purple-500/5 hover:border-brand-purple-500/40 transition-all text-center'>
                + Add New Chapter
              </button>
            </div>
            <div className='p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3'>
              <button onClick={()=>setCurriculumModalId(null)} className='px-6 py-2.5 text-sm font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all'>Discard Changes</button>
              <button onClick={updateCurriculum} className='px-8 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 text-white shadow-lg shadow-brand-purple-500/20 active:scale-95 transition-all'>Save Curriculum</button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : <Loading />
};

export default MyCourses;