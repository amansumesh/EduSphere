import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import StudentSidebar from '../../components/student/StudentSidebar'
import Footer from '../../components/educator/Footer'

const Student = () => {
    const [showSidebar, setShowSidebar] = useState(true)

    return (
        <div className="h-screen flex flex-col bg-brand-black text-white bg-brand-gradient">
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} bgColor="bg-transparent" />
            <div className='flex flex-1 overflow-hidden'>
                <StudentSidebar showSidebar={showSidebar} />
                <div className='flex-1 overflow-y-auto flex flex-col'>
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Student
