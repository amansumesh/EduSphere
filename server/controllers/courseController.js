import Course from "../models/Course.js"


// Get All Courses
export const getAllCourse = async (req, res) => {
    try {

        const courses = await Course.find({ isPublished: true })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator', select: '-password' })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get Course by Id
export const getCourseId = async (req, res) => {

    const { id } = req.params

    try {

        const courseData = await Course.findById(id)
            .populate({ path: 'educator'})

        // Remove lectureUrl if isPreviewFree is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            });
        });

        res.json({ success: true, courseData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

} 

// Get Recommended Courses by course id
export const getCourseRecommendations = async (req, res) => {
    const { id } = req.params
    const limit = Math.max(parseInt(req.query.limit || '8', 10), 1)

    try {
        const baseCourse = await Course.findById(id)
        if (!baseCourse) {
            return res.json({ success: false, message: 'Course not found' })
        }

        const labelPool = new Set([...(baseCourse.tags || [])])

        const orClauses = []
        // Same educator
        if (baseCourse.educator) {
            orClauses.push({ educator: baseCourse.educator })
        }
        // Overlapping labels
        if (labelPool.size > 0) {
            const labels = Array.from(labelPool)
            orClauses.push({ tags: { $in: labels } })
        }

        const query = {
            _id: { $ne: id },
            isPublished: true,
            ...(orClauses.length ? { $or: orClauses } : {})
        }

        const courses = await Course.find(query)
            .limit(limit)
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator', select: '-password' })

        return res.json({ success: true, courses })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}