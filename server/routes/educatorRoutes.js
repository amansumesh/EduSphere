import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateCourse, updateRoleToEducator, getCourseRaw, updateCourseCurriculum } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';


const educatorRouter = express.Router()

// Add Educator Role 
educatorRouter.get('/update-role', updateRoleToEducator)

// Add Courses 
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)

// Get Educator Courses 
educatorRouter.get('/courses', protectEducator, getEducatorCourses)

// Update Course (owned by educator)
educatorRouter.put('/course/:id', protectEducator, express.json(), updateCourse)

// Get full course for editing
educatorRouter.get('/course/:id/raw', protectEducator, getCourseRaw)

// Update curriculum
educatorRouter.put('/course/:id/curriculum', protectEducator, express.json(), updateCourseCurriculum)

// Get Educator Dashboard Data
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)

// Get Educator Students Data
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)


export default educatorRouter;