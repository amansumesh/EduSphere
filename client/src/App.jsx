import React, { useContext } from 'react'
import { Routes, Route, useLocation, useMatch } from 'react-router-dom'
import Navbar from './components/student/Navbar'
import Home from './pages/student/Home'
import CourseDetails from './pages/student/CourseDetails'
import CoursesList from './pages/student/CoursesList'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Educator from './pages/educator/Educator'
import 'quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Player from './pages/student/Player'
import MyEnrollments from './pages/student/MyEnrollments'
import Loading from './components/student/Loading'
import Onboarding from './pages/student/Onboarding'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Student from './pages/student/Student'
import StudentDashboard from './pages/student/StudentDashboard'

const App = () => {

  const isEducatorRoute = useMatch('/educator/*');
  const isStudentRoute = useMatch('/student/*');
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoaded && user) {
      if (!user.publicMetadata.role && location.pathname !== '/onboarding' && !location.pathname.startsWith('/loading')) {
        navigate('/onboarding');
      } else if (user.publicMetadata.role === 'educator' && (location.pathname === '/' || location.pathname === '/course-list')) {
        navigate('/educator');
      } else if (user.publicMetadata.role === 'student' && location.pathname === '/') {
        navigate('/student');
      } else if (user.publicMetadata.role === 'student' && location.pathname === '/course-list') {
        navigate('/student/course-list');
      }
    }
  }, [user, isLoaded, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-brand-black text-white bg-brand-gradient">
      <ToastContainer />
      {(!isEducatorRoute && !isStudentRoute) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path='/educator' element={<Educator />}>
          <Route path='' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>
        <Route path='/student' element={<Student />}>
          <Route path='' element={<StudentDashboard />} />
          <Route path='my-enrollments' element={<MyEnrollments />} />
          <Route path='course-list' element={<CoursesList />} />
          <Route path='course-list/:input' element={<CoursesList />} />
        </Route>
        <Route path='/onboarding' element={<Onboarding />} />
      </Routes>
    </div>
  )
}

export default App