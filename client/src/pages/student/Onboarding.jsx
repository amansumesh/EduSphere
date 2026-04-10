import React, { useContext, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Onboarding = () => {
    const { user } = useUser();
    const { backendUrl, getToken, setIsEducator, navigate } = useContext(AppContext);

    useEffect(() => {
        if (user && user.publicMetadata.role) {
            navigate('/');
        }
    }, [user, navigate]);

    const setRole = async (role) => {
        try {
            const token = await getToken();
            const { data } = await axios.post(
                backendUrl + '/api/user/update-role',
                { role },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                toast.success(data.message);
                if (role === 'educator') {
                    setIsEducator(true);
                    navigate('/educator');
                } else {
                    setIsEducator(false);
                    navigate('/');
                }
                // Reload user data to reflect metadata change
                await user.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black text-white px-4">
            <div className="max-w-4xl w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-brand-pink-400 via-brand-purple-400 to-brand-blue-400 bg-clip-text text-transparent">
                        Welcome to EduSphere
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl">
                        To get started, please tell us how you'll be using the platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    {/* Student Card */}
                    <div 
                        onClick={() => setRole('student')}
                        className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-purple-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 space-y-6">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-4xl">🎓</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">I'm a Student</h3>
                                <p className="text-gray-400">Search for courses, learn new skills, and track your progress.</p>
                            </div>
                            <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors border border-white/5">
                                Select Student
                            </button>
                        </div>
                    </div>

                    {/* Educator Card */}
                    <div 
                        onClick={() => setRole('educator')}
                        className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-pink-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 space-y-6">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-4xl">👨‍🏫</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">I'm an Educator</h3>
                                <p className="text-gray-400">Create courses, manage students, and share your knowledge.</p>
                            </div>
                            <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors border border-white/5">
                                Select Educator
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
