import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const MyCourses = () => {

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)

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
    <div className="h-screen flex flex-col items-center justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className='w-full'>
        <h2 className="pb-4 text-xl font-semibold text-white">My Courses</h2>
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-lg bg-white/5 border border-white/10">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-white border-b border-white/10 text-base text-left">
              <tr>
                <th className="px-6 py-4 font-semibold truncate">All Courses</th>
                <th className="px-6 py-4 font-semibold truncate">Earnings</th>
                <th className="px-6 py-4 font-semibold truncate">Students</th>
                <th className="px-6 py-4 font-semibold truncate">Published On</th>
              </tr>
            </thead>
            <tbody className="text-base text-gray-300">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-white/10">
                  <td className="md:px-6 pl-3 md:pl-6 py-4 flex items-center space-x-4 truncate">
                    <img src={course.courseThumbnail} alt="Course Image" className="w-20" />
                    <span className="truncate hidden md:block font-medium">{course.courseTitle}</span>
                  </td>
                  <td className="px-6 py-4">{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td>
                  <td className="px-6 py-4">{course.enrolledStudents.length}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                      <button onClick={() => openEdit(course)} className='px-3 py-1.5 text-xs rounded bg-green-600 hover:bg-green-700 text-white'>Edit</button>
                      <button onClick={() => openCurriculumModal(course._id)} className='px-3 py-1.5 text-xs rounded bg-brand-purple-500 hover:bg-brand-purple-600 text-white'>Edit Curriculum</button>
                    </div>
                    {editOpenId === course._id && (
                      <div className='mt-3 p-4 bg-white/5 border border-white/10 rounded text-gray-300 space-y-3'>
                        <div className='grid grid-cols-2 gap-4'>
                          <label className='text-xs'>Title
                            <input value={editData.courseTitle} onChange={(e)=>setEditData({...editData, courseTitle:e.target.value})} className='mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' />
                          </label>
                          <label className='text-xs'>Price
                            <input type='number' value={editData.coursePrice} onChange={(e)=>setEditData({...editData, coursePrice:e.target.value})} className='mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' />
                          </label>
                          <label className='text-xs'>Discount %
                            <input type='number' min={0} max={100} value={editData.discount} onChange={(e)=>setEditData({...editData, discount:e.target.value})} className='mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' />
                          </label>
                          <label className='text-xs'>Tags (comma)
                            <input value={editData.tags.join(', ')} onChange={(e)=>setEditData({...editData, tags: e.target.value.split(',').map(t=>t.trim()).filter(Boolean)})} className='mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' />
                          </label>
                        </div>
                        <label className='inline-flex items-center gap-2 text-xs'>
                          <input type='checkbox' checked={!!editData.isPublished} onChange={(e)=>setEditData({...editData, isPublished:e.target.checked})} />
                          <span>Published</span>
                        </label>
                        <div className='flex gap-2 justify-end'>
                          <button onClick={()=>setEditOpenId(null)} className='px-3 py-1.5 text-xs rounded bg-gray-600 hover:bg-gray-700 text-white'>Cancel</button>
                          <button onClick={()=>saveEdit(course._id)} className='px-3 py-1.5 text-xs rounded bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 text-white'>Save</button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {curriculumModalId && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
          <div className='bg-brand-black border border-white/10 rounded w-full max-w-5xl max-h-[90vh] overflow-auto p-6 text-gray-200'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-semibold'>Edit Curriculum</h3>
              <button onClick={()=>setCurriculumModalId(null)} className='px-3 py-1.5 text-xs rounded bg-red-600 hover:bg-red-700 text-white'>Close</button>
            </div>
            <div className='space-y-4'>
              {curriculum.map((chapter, cIdx) => (
                <div key={chapter.chapterId || cIdx} className='border border-white/10 rounded p-4'>
                  <div className='flex items-center justify-between gap-3'>
                    <input value={chapter.chapterTitle}
                      onChange={(e)=>updateChapterField(cIdx, 'chapterTitle', e.target.value)}
                      className='flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' />
                    <button onClick={()=>removeChapter(cIdx)} className='px-3 py-1.5 text-xs rounded bg-red-600 hover:bg-red-700 text-white'>Remove</button>
                  </div>
                  <div className='mt-3 space-y-3'>
                    {(chapter.chapterContent||[]).map((lecture, lIdx) => (
                      <div key={lecture.lectureId || lIdx} className='grid grid-cols-12 gap-3'>
                        <input className='col-span-4 px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' value={lecture.lectureTitle} onChange={(e)=>updateLectureField(cIdx, lIdx, 'lectureTitle', e.target.value)} />
                        <input type='number' className='col-span-2 px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' value={lecture.lectureDuration} onChange={(e)=>updateLectureField(cIdx, lIdx, 'lectureDuration', Number(e.target.value))} />
                        <input className='col-span-5 px-3 py-2 rounded bg-white/5 border border-white/10 outline-none' value={lecture.lectureUrl} onChange={(e)=>updateLectureField(cIdx, lIdx, 'lectureUrl', e.target.value)} />
                        <label className='col-span-1 inline-flex items-center gap-2 text-xs'>
                          <input type='checkbox' checked={!!lecture.isPreviewFree} onChange={(e)=>updateLectureField(cIdx, lIdx, 'isPreviewFree', e.target.checked)} />
                          <span>Free</span>
                        </label>
                        <div className='col-span-12 flex justify-end'>
                          <button onClick={()=>removeLecture(cIdx, lIdx)} className='px-3 py-1.5 text-xs rounded bg-red-600 hover:bg-red-700 text-white'>Remove</button>
                        </div>
                      </div>
                    ))}
                    <button onClick={()=>addLectureToChapter(cIdx)} className='px-3 py-1.5 text-xs rounded bg-green-600 hover:bg-green-700 text-white'>+ Add Lecture</button>
                  </div>
                </div>
              ))}
              <button onClick={addChapter} className='px-3 py-1.5 text-xs rounded bg-green-600 hover:bg-green-700 text-white'>+ Add Chapter</button>
            </div>
            <div className='flex justify-end gap-2 mt-5'>
              <button onClick={()=>setCurriculumModalId(null)} className='px-3 py-1.5 text-xs rounded bg-gray-600 hover:bg-gray-700 text-white'>Cancel</button>
              <button onClick={updateCurriculum} className='px-3 py-1.5 text-xs rounded bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 text-white'>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : <Loading />
};

export default MyCourses;