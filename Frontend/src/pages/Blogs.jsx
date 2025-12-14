import BlogCard from '@/Components/BlogCard'
import { setBlog } from '@/Redux/blogSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/Components/ui/button'

function Blogs() {

    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const [searchParams] = useSearchParams()

    // URL se category read karke initial state set karo
    const categoryFromUrl = searchParams.get('category')
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All')

    const categories = [
        "All",
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
        "Other",
    ]

    // Category change hone par blogs fetch karo
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const url = selectedCategory === 'All'
                    ? 'http://localhost:8000/api/v1/blog'
                    : `http://localhost:8000/api/v1/blog/category/${encodeURIComponent(selectedCategory)}`

                const res = await axios.get(url, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error)
                // Error aane par empty array set karo
                dispatch(setBlog([]))
                toast.error(error.response?.data?.message || 'Failed to fetch blogs')
            }
        }

        fetchBlogs()
    }, [selectedCategory, dispatch])

    return (
        <div className='pt-15 bg-white dark:bg-black min-h-screen'>
            <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold pt-10 text-black dark:text-white'>Our Blogs</h1>
                <hr className='w-24 text-center border-2 border-black dark:border-white rounded-full' />
            </div>

            <div className='max-w-6xl mx-auto px-4 md:px-0 py-6'>
                <div className='flex flex-wrap gap-2 justify-center'>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-sm transition-all ${selectedCategory === category
                                ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-white'
                                : 'hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white dark:hover:text-white border-gray-300 dark:border-[#2a2a2a]'
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div className='max-w-6xl mx-auto py-10 px-4 md:px-0'>
                {
                    blog && blog.length > 0 ? (
                        <div className='grid gap-10 grid-cols-1 md:grid-cols-3'>
                            {blog.map((blog, index) => (
                                <BlogCard key={blog._id || index} blog={blog} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-20'>
                            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>No Blogs Found</h2>
                            <p className='text-muted-foreground'>No blogs available in {selectedCategory} category yet.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Blogs