# EduSphere LMS 🎓

EduSphere is a modern, full-stack Learning Management System (LMS) designed to bridge the gap between students and educators. It provides a seamless platform for course creation, enrollment, progress tracking, and secure payments, all wrapped in a premium, glassmorphic user interface.

## 🚀 Project Overview
EduSphere empowers educators to share their knowledge and students to learn at their own pace. With integrated authentication, secure payment processing, and real-time progress tracking, it offers a professional-grade learning experience.

## 🎯 Objectives
- **Accessibility**: Provide an easy-to-use platform for global learning.
- **Efficiency**: Streamline course management for educators with automated workflows.
- **Engagement**: Use modern UI/UX design to keep students motivated and focused.
- **Security**: Ensure safe transactions and user data protection via Clerk and Stripe.

## ✨ Features
### For Students
- **Course Marketplace**: Browse and filter courses across various categories.
- **Personalized Dashboard**: Track enrolled courses and overall learning progress.
- **Interactive Player**: High-quality video playback with lesson navigation.
- **Onboarding**: Tailored experience for new users to get started quickly.
- **Secure Payments**: Frictionless checkout using Stripe integration.

### For Educators
- **Course Management**: Create, edit, and publish rich course content (videos, text, resources).
- **Earnings Analytics**: Monitor course performance and revenue trends.
- **Student Enrollment Tracking**: View detailed statistics on enrolled students.
- **Rich Text Editor**: Integrated Quill editor for professional course descriptions.

### Platform-wide
- **Glassmorphic Design**: Clean, modern aesthetics with blurred backgrounds and vibrant gradients.
- **Responsive Layout**: Optimized for desktop, tablet, and mobile viewing.
- **Automated Webhooks**: Real-time synchronization of user data and payment status.

## 🛠️ Tech Stack
| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Framer Motion, Axios, Lucide Icons, react-router-dom |
| **Auth** | Clerk Authentication (Multi-factor security) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ORM) |
| **Storage** | Cloudinary (Media hosting) |
| **Payments** | Stripe API |
| **Infrastructure** | AWS S3 (Frontend), AWS EC2 (Backend) |
| **CI/CD** | Jenkins |

## 🏗️ System Architecture
EduSphere follows a decoupled client-server architecture for scalability and performance.

<img width="984" height="536" alt="image" src="https://github.com/user-attachments/assets/999e72f8-b603-4f02-b672-c4b847a07e60" />

## 🔄 Workflow / How It Works
1. **User Authentication**: Users sign up/in via Clerk. Webhooks sync user data to the MongoDB database automatically.
2. **Educator Mode**: Users can switch to educator mode to create courses, uploading videos to Cloudinary and storing metadata in MongoDB.
3. **Course Discovery**: Students browse the marketplace. Course data is fetched from the server and displayed with a premium UI.
4. **Enrollment**: Students "purchase" courses. Stripe handles the transaction, and a webhook notifies the backend to grant access.
5. **Learning Path**: Students access their dashboard, track progress through lessons, and manage their profile.


## 🧪 Testing
- **Development**: Environment variables managed via `.env` files for both client and server.
- **API Testing**: Manual testing conducted via Postman for all CRUD operations and webhooks.
- **UI Testing**: Responsive design verified across Modern browsers (Chrome, Firefox, Safari).
- **Security**: Authenticated routes protected via Clerk middleware and JWT validation.

## 🚀 Deployment
### Frontend (AWS S3)
- Build the project: `npm run build`
- Upload the `dist` folder contents to an S3 bucket configured for static web hosting.

### Backend (AWS EC2)
- Server hosted on an Ubuntu EC2 instance.
- Managed using **PM2** for process uptime and automatic restarts.
- Connected to **MongoDB Atlas** via secure connection strings.
- Reverse proxy recommended via **Nginx** for SSL/TLS management.

### CI/CD Pipeline (Jenkins)
- Automated end-to-end deployment using Jenkins triggered via GitHub webhooks. 
- Frontend built and deployed to AWS S3. 
- Backend updated on EC2 via SSH with seamless restart using PM2.  
- Secure environment configuration with MongoDB Atlas and HTTPS via Nginx.  
- Ensures fast, reliable, and zero-downtime deployments.
- Reduces manual effort and ensures faster, reliable deployments. 
