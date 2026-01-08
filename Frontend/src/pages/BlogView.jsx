import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Bookmark, MessageSquare, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { setBlog } from '@/Redux/blogSlice';
import CommentBox from '@/Components/CommentBox';
import api from '@/Config/axios';


function BlogView() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const blogId = params.blogId

    const { blog } = useSelector(store => store.blog)
    const { user } = useSelector(store => store.auth)
    const selectedBlog = blog?.find(b => b._id === blogId)

    const [blogLike, setBlogLike] = useState(selectedBlog?.likes?.length)
    const [liked, setLiked] = useState(selectedBlog?.likes?.includes(user?._id) || false)

    const changeTimeFormat = (isoDate) => {
        const date = new Date(isoDate)
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
        const formatedDate = date.toLocaleDateString('en-IN', options)
        return formatedDate
    }

    const handleShare = (blogId) => {
        const blogURL = `${window.location.origin}/blogs/${blogId}`;
        if (navigator.share) {
            navigator.share({
                title: "check out this blog!",
                text: "Read this amazing blog post",
                url: blogURL,
            })
                .then(() => console.log("Shared successfully"))
                .catch((e) => console.error(e))
        } else {
            navigator.clipboard.writeText(blogURL)
                .then(() => {
                    toast.success("Copy to clipboard")
                })
                .catch((e) => console.error(e))
        }
    }

    const likeToggler = async () => {
        if (!selectedBlog) return

        if (!user) {
            navigate("/login")
        }

        try {
            const action = liked ? 'dislike' : 'like'
            const res = await api.get(`/api/v1/blog/${selectedBlog._id}/${action}`)
            if (res.data.success) {
                const updatedLikes = liked ? blogLike - 1 : blogLike + 1
                setBlogLike(updatedLikes)
                setLiked(!liked)
            }

            const updatedBlogData = blog.map(b => b._id === selectedBlog._id ? {
                ...b,
                likes: liked ? b.likes.filter(id => id !== user?._id) : [...b.likes, user?._id]
            } : b)
            toast.success(res.data.message)
            dispatch(setBlog(updatedBlogData))
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to update like')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [selectedBlog])

    if (!selectedBlog) {
        return (
            <div className='pt-14 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold mb-2'>Blog not found</h2>
                    <p className='text-muted-foreground mb-4'>The blog you're looking for doesn't exist.</p>
                    <Button asChild>
                        <Link to='/blogs'>View All Blogs</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className='pt-14'>
            <div className='max-w-6xl mx-auto p-4 md:p-10'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/blogs">Blogs</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* blog header */}
                <div className='my-8'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4'>{selectedBlog?.title}</h1>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                        <div className='flex items-center space-x-4'>
                            <Avatar>
                                <AvatarImage src={selectedBlog?.author?.profilePicture} alt="profile" />
                                <AvatarFallback>PS</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-medium '>{selectedBlog?.author?.username}</p>
                            </div>
                        </div>
                        <p className='text-sm text-muted-foreground shadow'>
                            Publish on :- {changeTimeFormat(selectedBlog?.createdAt)}
                        </p>
                    </div>
                </div>

                {/* featured image */}
                <div className='mb-8 rounded-lg overflow-hidden'>
                    <img src={selectedBlog?.thumbnail} alt="thumbnail" width={1000} height={500} className='w-full object-cover' />
                    <p className='text-sm text-muted-foreground mt-2 italic'>{selectedBlog?.subtitle}</p>
                </div>

                {/* description */}
                <div
                    className='blog-content'
                    dangerouslySetInnerHTML={{ __html: selectedBlog?.description }}
                />

                {/* engagement */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between border-y dark:border-[#2a2a2a] border-gray-300 py-4 mb-8 gap-4'>
                    <div className='flex items-center gap-4 sm:gap-8'>
                        <Button onClick={likeToggler} className='flex items-center gap-2 hover:bg-transparent' variant="ghost">
                            {
                                liked ? <FaHeart size={20} className='sm:size-6 cursor-pointer text-red-600' />
                                    : <FaRegHeart size={20} className='sm:size-6 cursor-pointer' />
                            }
                            <span>{blogLike}</span>
                        </Button>
                        <Button variant="outline" className="hover:bg-transparent hover:text-current text-sm sm:text-base">
                            <MessageSquare className='h-4 w-4' />
                            <span className="hidden sm:inline">{selectedBlog.comments.length} Comment</span>
                            <span className="sm:hidden">{selectedBlog.comments.length}</span>
                        </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button variant="ghost">
                            <Bookmark className='w-4 h-4' />
                        </Button>
                        <Button variant="ghost" onClick={() => handleShare(selectedBlog?._id)}>
                            <Share2 className='w-4 h-4' />
                        </Button>
                    </div>
                </div>

                <CommentBox selectedBlog={selectedBlog} />
            </div>
        </div>
    )
}

export default BlogView