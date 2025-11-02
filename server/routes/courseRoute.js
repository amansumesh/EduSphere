import express from 'express'
import { getAllCourse, getCourseId, getCourseRecommendations } from '../controllers/courseController.js';


const courseRouter = express.Router()

// Get All Course
courseRouter.get('/all', getAllCourse)

// Get Course Data By Id
courseRouter.get('/:id', getCourseId)

// Get Recommended Courses for a Course
courseRouter.get('/:id/recommendations', getCourseRecommendations)


export default courseRouter;