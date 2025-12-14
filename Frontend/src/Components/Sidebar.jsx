import { ChartColumnBig, SquareUser } from 'lucide-react'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <div className='hidden mt-10 fixed md:block border-r-2 bg-white dark:bg-black border-gray-300 dark:border-[#2a2a2a] w-[300px] p-10 space-y-2 h-screen z-10 shadow-lg'>
            <div className='text-center pt-10 px-3 space-y-2'>
                <NavLink to="/dashboard/profile" className={({ isActive }) => `text-2xl ${isActive ? "bg-black dark:bg-white text-white dark:text-black shadow-lg" : "bg-transparent hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full transition-all`}>
                    <SquareUser />
                    <span>Profile</span>
                </NavLink>

                <NavLink to="/dashboard/your-blogs" className={({ isActive }) => `text-2xl ${isActive ? "bg-black dark:bg-white text-white dark:text-black shadow-lg" : "bg-transparent hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full transition-all`}>
                    <ChartColumnBig />
                    <span>Your Blogs</span>
                </NavLink>

                <NavLink to="/dashboard/create-blog" end className={({ isActive }) => `text-2xl ${isActive ? "bg-black dark:bg-white text-white dark:text-black shadow-lg" : "bg-transparent hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full transition-all`}>
                    <FaRegEdit />
                    <span>Create Blog</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar