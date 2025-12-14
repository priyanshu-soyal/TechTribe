import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

function BlogCard({ blog }) {

    const navigate = useNavigate()

    const formattedDateFn = (createdAt) => {
        const date = new Date(createdAt)
        const formattedDate = date.toLocaleDateString("en-IN")
        return formattedDate;
    }

    return (
        <div className='bg-white dark:bg-black dark:border-[#2a2a2a] p-5 rounded-2xl shadow-md dark:shadow-sm border border-gray-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-md transition-all duration-300 ease-in-out relative'>
            <span className='absolute right-6 top-6 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md'> {blog.category}</span>
            <img src={blog.thumbnail} alt={blog._id} className='rounded-lg h-50' />
            <div className='text-sm mt-2 flex justify-between items-center my-1'>
                <div className='flex items-center gap-2'>
                    <Avatar className="w-5 h-5">
                        <AvatarImage src={blog.author.profilePicture} alt="profile" />
                        <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <span>{blog.author.username}</span>
                </div>
                <span> {formattedDateFn(blog.createdAt)}</span>
            </div>
            <h2 className='text-lg md:text-xl font-semibold line-clamp-2'>{blog.title}</h2>
            <h3 className='text-muted-foreground mt-1 text-sm line-clamp-2'>{blog.subtitle}</h3>
            <Button className="mt-2" onClick={() => navigate(`/blogs/${blog._id}`)}>
                Read more
            </Button>
        </div>
    )
}

export default BlogCard