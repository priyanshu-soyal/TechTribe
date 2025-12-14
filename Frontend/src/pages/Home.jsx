import RecentBlog from '@/Components/RecentBlog'
import Hero from '../Components/Hero'
import React from 'react'

function Home() {
    return (
        <div className='pt-15'>
            <Hero />
            <RecentBlog />

        </div>
    )
}

export default Home