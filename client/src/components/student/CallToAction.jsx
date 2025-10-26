import React from 'react'
import { assets } from '../../assets/assets'
import { useClerk } from '@clerk/clerk-react';

const CallToAction = () => {
    const { openSignIn } = useClerk();

    return (
        <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
            <h1 className='md:text-4xl text-xl text-white font-semibold'>Learn anything, anytime, anywhere</h1>
            <p className='text-gray-300 sm:text-sm'>Our personalized learning paths help you find the exact skills you need to achieve your professional goals and unlock a brighter future, all at your own pace.</p>
            <div className='flex items-center font-medium gap-6 mt-4'>
                <button 
                    onClick={() => openSignIn()} 
                    className='px-10 py-3 rounded-md text-white bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 hover:from-brand-pink-600 hover:to-brand-purple-600'
                >
                    Get started
                </button>
                <button className='flex items-center gap-2'>
                    Learn more
                    <img src={assets.arrow_icon} alt="arrow_icon" />
                </button>
            </div>
        </div>
    )
}

export default CallToAction