import { Card } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { setBlog } from '@/Redux/blogSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Edit, Trash2, Calendar, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function YourBlog() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { blog } = useSelector(store => store.blog)

    const getOwnBlog = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/blog/get-own-blogs`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setBlog(res.data.blogs))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        getOwnBlog()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formateDate = (createdAt) => {
        const date = new Date(createdAt)
        const formatedDate = date.toLocaleDateString("en-IN")
        return formatedDate
    }

    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedBlogData = blog.filter((b) => b._id !== id)
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='pb-10 pt-16 md:pt-20 md:ml-80 min-h-screen px-4 md:px-6'>
            <div className='max-w-6xl mx-auto mt-4 md:mt-8'>
                <div className='mb-6'>
                    <h1 className='text-2xl md:text-3xl font-bold mb-2'>Your Blogs</h1>
                    <p className='text-muted-foreground text-sm md:text-base'>Manage and edit your published blogs</p>
                </div>

                {blog.length === 0 ? (
                    <Card className='p-8 md:p-12 text-center dark:bg-[#1a1a1a]'>
                        <h2 className='text-xl md:text-2xl font-semibold mb-2'>No blogs yet</h2>
                        <p className='text-muted-foreground mb-4'>Start creating your first blog post</p>
                        <Button onClick={() => navigate('/dashboard/create-blog')}>Create Blog</Button>
                    </Card>
                ) : (
                    <div className='grid grid-cols-1 gap-4 md:gap-6'>
                        {blog.map((item) => (
                            <Card key={item._id} className='p-4 md:p-6 hover:shadow-lg transition-shadow dark:bg-[#1a1a1a] dark:border-[#2a2a2a]'>
                                <div className='flex flex-col sm:flex-row gap-4'>
                                    {/* Thumbnail */}
                                    <div className='w-full sm:w-40 md:w-48 shrink-0'>
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className='w-full h-32 sm:h-28 md:h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity'
                                            onClick={() => navigate(`/blogs/${item._id}`)}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className='flex-1 min-w-0'>
                                        <h2
                                            className='text-lg md:text-xl font-semibold mb-2 hover:underline cursor-pointer line-clamp-2'
                                            onClick={() => navigate(`/blogs/${item._id}`)}
                                        >
                                            {item.title}
                                        </h2>

                                        {item.subtitle && (
                                            <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>{item.subtitle}</p>
                                        )}

                                        <div className='flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-4'>
                                            <div className='flex items-center gap-1'>
                                                <Tag className='h-4 w-4' />
                                                <span>{item.category}</span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <Calendar className='h-4 w-4' />
                                                <span>{formateDate(item.createdAt)}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className='flex flex-wrap gap-2'>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => navigate(`/dashboard/create-blog/${item._id}`)}
                                                className='flex items-center gap-2 dark:text-white dark:hover:text-white'
                                            >
                                                <Edit className='h-4 w-4' />
                                                <span>Edit</span>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => deleteBlog(item._id)}
                                                className='flex items-center gap-2'
                                            >
                                                <Trash2 className='h-4 w-4' />
                                                <span>Delete</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default YourBlog