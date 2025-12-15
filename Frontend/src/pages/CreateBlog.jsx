import { Card } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import React, { useState } from 'react'
import { Button } from '@/Components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setBlog, setLoading } from '@/Redux/blogSlice'
import { Loader2 } from 'lucide-react'

function WriteBlog() {

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { blog, loading } = useSelector(store => store.blog)

    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    const createBlogHandler = async () => {
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`http://localhost:8000/api/v1/blog`, { title, category }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                const createdBlog = Array.isArray(blog) ? [...blog, res.data.blog] : [res.data.blog]
                dispatch(setBlog(createdBlog))
                navigate(`/dashboard/create-blog/${res.data.blog._id}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to create blog")
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='p-4 md:pr-20 min-h-screen md:ml-80 pt-20 bg-white dark:bg-black'>
            <Card className="md:p-10 p-4 dark:bg-[#1a1a1a] -space-y-5">
                <h1 className='text-2xl font-bold text-black dark:text-white'>Let's create blog</h1>
                <p className='text-gray-700 dark:text-gray-300'>Start your blogging journey by creating a new post. Choose a compelling title and select the most relevant category to help readers discover your content. Share your knowledge, insights, and experiences with the tech community.</p>
                <div className='mt-10'>
                    <div>
                        <Label htmlFor="title" className='mb-2'>Title</Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter title of blog"
                            value={title}
                            onChange={((e) => setTitle(e.target.value))}
                            className='dark:shadow-sm dark:shadow-gray-100/20 text-sm md:text-base'
                        />
                    </div>
                    <div className='my-5'>
                        <Label htmlFor="category" className='mb-2'>Category</Label>
                        <Select onValueChange={getSelectedCategory}>
                            <SelectTrigger className="w-[200px]  dark:shadow-sm dark:shadow-gray-100/20 text-sm md:text-base">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="Web Development">Web Development</SelectItem>
                                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                                    <SelectItem value="Data Science">Data Science</SelectItem>
                                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                                    <SelectItem value="DevOps">DevOps</SelectItem>
                                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                                    <SelectItem value="Blockchain / Web3">Blockchain / Web3</SelectItem>
                                    <SelectItem value="System Design">System Design</SelectItem>
                                    <SelectItem value="Hardware / IoT">Hardware / IoT</SelectItem>
                                    <SelectItem value="Gaming">Gaming</SelectItem>
                                    <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                                    <SelectItem value="Tech Career & Education">Tech Career & Education</SelectItem>
                                    <SelectItem value="Productivity & Tools">Productivity & Tools</SelectItem>
                                    <SelectItem value="Tech News">Tech News</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex gap-5'>
                        <Link to={"/dashboard/profile"}><Button variant="outline" className='dark:text-white dark:hover:text-white'>Cancel</Button></Link>
                        <Button disabled={loading} onClick={createBlogHandler}>
                            {
                                loading ? (
                                    <>
                                        <Loader2 className='mr-2 w-4 h-4 animate-spin' /> please wait
                                    </>
                                ) : ("Create")
                            }
                        </Button>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default WriteBlog