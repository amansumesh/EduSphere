import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/educator/SideBar'
import Navbar from '../../components/educator/Navbar'
import Footer from '../../components/educator/Footer'

const Educator = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="min-h-screen bg-brand-black text-white bg-brand-gradient">
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div className='flex'>
                <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <div className='flex-1 overflow-y-auto'>
                    {<Outlet />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Educator