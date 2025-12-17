import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

function BlogCardList({ blog }) {

    const navigate = useNavigate()

    return (
        <div className='bg-white dark:bg-black dark:border-[#2a2a2a] border border-gray-300 flex flex-col md:flex-row md:gap-10 p-5 rounded-2xl mt-6 shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-md transition-all'>
            <div className=' md:w-80'>
                <img src={blog?.thumbnail} alt="blog-thumbnail" className='rounded-lg w-full md:h-48 object-cover hover:scale-105 transition-all' />
            </div>
            <div className='flex-1'>
                <h2 className='text-xl md:text-2xl font-semibold mt-3 md:mt-1 line-clamp-2'>{blog?.title}</h2>
                <h3 className='text-muted-foreground mt-1 text-sm md:text-base line-clamp-2'>{blog?.subtitle}</h3>
                <Button className="mt-2" onClick={() => navigate(`/blogs/${blog?._id}`)}>
                    Read more
                </Button>
            </div>
        </div>
    )
}

export default BlogCardList