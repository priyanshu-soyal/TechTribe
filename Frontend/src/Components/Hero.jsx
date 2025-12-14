import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useSelector } from 'react-redux';

function Hero() {
    const { user } = useSelector(store => store.auth);
    return (
        <div className='px-4 md:px-0 bg-white dark:bg-black'>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[500px] md:h-[600px] py-10 md:py-0 gap-8'>
                {/* text section */}
                <div className='max-w-2xl text-center md:text-left'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black dark:text-white'>Explore the latest Tech & Web Trends</h1>
                    <p className='text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6'>Discover what is happening in the tech world today, or share your own knowledge with our community.</p>
                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
                        <Link to={user ? "/dashboard/create-blog" : "/login"}> <Button className='text-base sm:text-lg shadow-lg w-full sm:w-auto'>Get Started</Button> </Link>
                        <Link to="/about"> <Button variant="outline" className='dark:text-white dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-auto'>Learn More</Button> </Link>
                    </div>
                </div>
                {/* image section */}
                <div className='flex items-center justify-center w-full md:w-auto'>
                    <img src="https://plus.unsplash.com/premium_vector-1726318627392-68d857451f77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8" alt="hero-image" className='w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:h-[550px] lg:w-[550px]' />

                </div>

            </div>

        </div>
    )
}

export default Hero