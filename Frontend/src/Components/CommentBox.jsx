import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Edit, LucideSend, Trash2 } from 'lucide-react'
import { BsThreeDots } from "react-icons/bs";
import { toast } from 'sonner'
import axios from 'axios'
import { setComment } from '@/Redux/CommentSlice'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { setBlog } from '@/Redux/blogSlice'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

function CommentBox({ selectedBlog }) {
    // console.log(blog)

    const dispatch = useDispatch()

    const { user } = useSelector(store => store.auth)
    const { blog } = useSelector(store => store.blog)
    const { comment } = useSelector(store => store.comment)

    const [content, setContent] = useState("")
    const [editCommentId, setEditCommentId] = useState(null)
    const [editContent, setEditContent] = useState("")

    const changeEventHandler = (e) => {
        setContent(e.target.value)
    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`https://the-techtribe.onrender.com/api/v1/comment/${selectedBlog._id}/create`, { content }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                let updatedComment;

                if (comment.length > 0) {
                    updatedComment = [...comment, res.data.comment];
                } else {
                    updatedComment = [res.data.comment]
                }

                dispatch(setComment(updatedComment))

                const updatedBlogData = blog.map(b => b._id === selectedBlog._id ?
                    { ...b, comments: [...b.comments, res.data.comment._id] }
                    : b
                )
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                setContent("");
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const getAllCommentOfBlog = async () => {
            try {
                const res = await axios.get(`https://the-techtribe.onrender.com/api/v1/comment/${selectedBlog._id}/comment/all`)
                const data = res.data.comment
                dispatch(setComment(data))
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || 'Failed to load comments')
            }
        }
        getAllCommentOfBlog()
    }, [selectedBlog._id, dispatch])

    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(`https://the-techtribe.onrender.com/api/v1/comment/${commentId}/delete`, { withCredentials: true })
            if (res.data.success) {
                const updatedComment = comment.filter((item) => item._id !== commentId)
                dispatch(setComment(updatedComment))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const editCommentHandler = async (commentId) => {
        try {
            const res = await axios.put(`https://the-techtribe.onrender.com/api/v1/comment/${commentId}/edit`,
                { content: editContent },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            if (res.data.success) {
                const updatedComment = comment.map(item => item._id === commentId ? { ...item, content: editContent } : item);
                dispatch(setComment(updatedComment))
                toast.success(res.data.message)
                setEditCommentId(null)
                setEditContent("")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const likeCommentHandler = async (commentId) => {
        try {
            const res = await axios.put(`https://the-techtribe.onrender.com/api/v1/comment/${commentId}/like`, {}, { withCredentials: true })
            if (res.data.success) {
                const updatedComment = res.data.updatedComment;
                const updatedCommentList = comment.map(item =>
                    item._id === commentId ? updatedComment : item
                )
                dispatch(setComment(updatedCommentList))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex items-center gap-4 mb-4'>
                <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h3 className='font-semibold text-black dark:text-white'>{user?.username}</h3>
            </div>
            <div className='flex gap-3 items-start mb-6'>
                <Textarea
                    placeholder='Leave a comment'
                    className='bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] flex-1 min-h-20 resize-none'
                    value={content}
                    onChange={changeEventHandler}
                />
                <Button onClick={commentHandler} className='mt-1' disabled={!content.trim()}>
                    <LucideSend className='w-4 h-4' />
                </Button>
            </div>
            {
                comment.length > 0 ? (
                    <div className='space-y-4'>
                        <h2 className='text-lg font-semibold text-black dark:text-white mb-4'>
                            Comments ({comment.length})
                        </h2>
                        {
                            comment.map((item, index) => (
                                <div
                                    key={index}
                                    className='bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4 hover:shadow-md transition-shadow'
                                >
                                    <div className='flex gap-3'>
                                        <Avatar className='w-10 h-10'>
                                            <AvatarImage src={item?.userId?.profilePicture} />
                                            <AvatarFallback>{item?.userId?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <h3 className='font-semibold text-black dark:text-white text-sm'>
                                                    {item?.userId?.username}
                                                </h3>
                                                <span className='text-xs text-muted-foreground'>
                                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            {
                                                editCommentId === item?._id ? (
                                                    <>
                                                        <Textarea
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                        />
                                                        <div>
                                                            <Button onClick={() => editCommentHandler(item._id)}>Save</Button>
                                                            <Button variant="outline" onClick={() => setEditCommentId(null)}>Cancel</Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-1 wrap-break-word'>
                                                        {item.content}
                                                    </p>
                                                )
                                            }

                                            <div className='flex mt-3 gap-5 items-center text-sm text-muted-foreground'>
                                                <div onClick={() => likeCommentHandler(item._id)}
                                                    className='flex gap-1 items-center cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors'
                                                >
                                                    {
                                                        item.likes.includes(user._id) ? <FaHeart fill={"red"} /> : <FaRegHeart className='w-4 h-4' />

                                                    }
                                                    <span>{item.numberOfLikes || 0}</span>
                                                </div>
                                                {/* <button className='hover:underline hover:text-black dark:hover:text-white transition-colors'>
                                                    Reply
                                                </button> */}
                                            </div>
                                        </div>
                                        {
                                            user._id === item?.userId._id ? (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger><BsThreeDots /></DropdownMenuTrigger>
                                                    <DropdownMenuContent >
                                                        <DropdownMenuItem onClick={() => {
                                                            setEditCommentId(item._id)
                                                            setEditContent(item.content)
                                                        }}><Edit /> Edit</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => deleteComment(item._id)}><Trash2 /> Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            ) : null
                                        }
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                ) : (null)
            }
        </div>

    )
}

export default CommentBox