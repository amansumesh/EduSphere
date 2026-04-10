import { clerkClient } from "@clerk/express"

// Middleware ( Protect User Routes )
export const protectUser = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.userId) {
            return res.json({ success: false, message: 'Login Required' })
        }
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Middleware ( Protect Educator Routes )
export const protectEducator = async (req, res, next) => {

    try {

        const userId = req.auth.userId

        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== 'educator') {
            return res.json({ success: false, message: 'Unauthorized Access' })
        }

        next()

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}