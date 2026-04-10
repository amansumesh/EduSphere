import { useClerk } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CallToAction = () => {
    const { openSignIn } = useClerk();
    const { navigate } = useContext(AppContext);

    return (
        <div className='w-full py-24 px-8 md:px-20 lg:px-40'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className='relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center bg-gradient-to-br from-brand-purple-900/40 to-brand-pink-900/40 border border-white/10'
            >
                {/* Decorative blobs */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-purple-500/20 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-pink-500/20 blur-[100px] rounded-full" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className='text-4xl md:text-6xl text-white font-bold leading-tight mb-8'>
                        Learn anything, <span className="text-gradient">anytime, anywhere</span>
                    </h2>
                    <p className='text-gray-400 text-lg md:text-xl mb-12'>
                        Our personalized learning paths help you find the exact skills you need to achieve your professional goals and unlock a brighter future, all at your own pace.
                    </p>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
                        <button 
                            onClick={() => openSignIn()} 
                            className='w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-brand-pink-500 to-brand-purple-500 hover:scale-105 transition-transform shadow-xl shadow-brand-pink-500/20'
                        >
                            Get Started Now
                        </button>
                        <button 
                            onClick={() => navigate('/course-list')}
                            className='group flex items-center gap-2 text-white font-semibold hover:text-brand-pink-400 transition-colors'
                        >
                            Explore Courses
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CallToAction