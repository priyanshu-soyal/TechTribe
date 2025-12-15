import { setBlog } from '@/Redux/blogSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import BlogCardList from './BlogCardList'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

function RecentBlog() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { blog } = useSelector(store => store.blog)

    const categories = [
        "Web Development",
        "Mobile Development",
        "AI/ML",
        "Data Science",
        "Cloud Computing",
        "DevOps",
        "Cyber Security",
        "Blockchain / Web3",
        "System Design",
        "Hardware / IoT",
        "Gaming",
        "Operating Systems",
        "Tech Career & Education",
        "Productivity & Tools",
        "Tech News",
    ]

    const handleCategoryClick = (category) => {
        navigate(`/blogs?category=${encodeURIComponent(category)}`)
    }

    useEffect(() => {
        const getRecentBlogs = async () => {
            try {
                const res = await axios.get('https://the-techtribe.onrender.com/api/v1/blog', { withCredentials: true });
                if (res.data.success) {
                    const blogs = res.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    dispatch(setBlog(blogs))
                }

            } catch (error) {
                console.log(error)
                toast.error(error.response?.data?.message || 'Failed to fetch blogs')
            }
        }
        getRecentBlogs()
    }, [dispatch])

    return (
        <div className='bg-white dark:bg-black pb-10'>
            <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center px-4'>
                <h1 className='text-3xl md:text-4xl font-bold pt-10 text-black dark:text-white'>Recent Blog</h1>
                <hr className='w-24 text-center border-2 border-black dark:border-white rounded-full' />
            </div>
            <div className='max-w-7xl flex flex-col lg:flex-row mx-auto gap-6 px-4'>
                <div>
                    <div className='mt-10'>
                        {
                            blog?.slice(0, 4).map((blog, index) => {
                                return <BlogCardList key={index} blog={blog} />
                            })
                        }
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                        <Button onClick={() => navigate("/blogs")}>More blogs</Button>
                    </div>
                </div>
                <div className='bg-white dark:bg-[#1a1a1a] hidden lg:block border border-gray-300 dark:border-[#2a2a2a] w-full lg:w-[450px] xl:w-[550px] p-5 rounded-xl shadow-lg dark:shadow-gray-900 mt-10 lg:sticky lg:top-20 h-fit'>
                    <h1 className='text-2xl font-semibold text-black dark:text-white'>Categories</h1>
                    <div className='my-5 flex flex-col gap-3'>
                        {
                            categories.map((category, index) => (
                                <Button
                                    key={index}
                                    variant='outline'
                                    size='sm'
                                    onClick={() => handleCategoryClick(category)}
                                    className='hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white dark:hover:text-white transition-all border-gray-300 dark:border-[#2a2a2a]'
                                >
                                    {category}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentBlog