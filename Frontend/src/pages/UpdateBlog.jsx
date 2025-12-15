import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import JoditEditor from "jodit-react"
import { useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setLoading, } from '@/Redux/blogSlice'
import { Loader2 } from 'lucide-react'

function UpdateBlog() {

    const editor = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const params = useParams()
    const id = params.blogId
    const { blog, loading } = useSelector(store => store.blog)
    const selectBlog = Array.isArray(blog) ? blog.find(b => b._id === id) : null

    const [content, setContent] = useState(selectBlog?.description || "")

    const [blogData, setBlogData] = useState({
        title: selectBlog?.title || "",
        subtitle: selectBlog?.subtitle || "",
        description: content,
        category: selectBlog?.category || "",
    })

    const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail)

    const handleChange = (e) => {
        const { name, value } = e.target
        setBlogData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const selectCategory = (value) => {
        setBlogData({ ...blogData, category: value })
    }

    const selectThumbnail = (e) => {
        const thumbnail = e.target.files?.[0]
        if (thumbnail) {
            setBlogData({ ...blogData, thumbnail: thumbnail })
            const fileReader = new FileReader()
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result)
            fileReader.readAsDataURL(thumbnail)
        }
    }

    const updateBlogHandler = async () => {
        const formData = new FormData()
        formData.append("title", blogData.title)
        formData.append("subtitle", blogData.subtitle)
        formData.append("description", content)
        formData.append("category", blogData.category)
        formData.append("thumbnail", blogData.thumbnail)

        try {
            dispatch(setLoading(true))

            const res = await axios.put(`http://localhost:8000/api/v1/blog/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/dashboard/your-blogs")
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='md:ml-80 pt-16 md:pt-20 px-3 md:px-6 pb-10'>
            <div className='max-w-6xl mx-auto mt-4 md:mt-8'>
                <Card className="w-full dark:bg-[#1a1a1a] p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className='space-y-2'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Basic Blog Information</h1>
                        <p className='text-sm md:text-base text-muted-foreground'>Make changes to your blog here. Click publish when you are done.</p>
                    </div>
                    <div className='space-y-4'>
                        <div>
                            <Label htmlFor="title" className="mb-2 text-sm md:text-base">Title</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={blogData.title}
                                onChange={handleChange}
                                className='text-sm md:text-base dark:shadow-sm dark:shadow-gray-100/20'
                            />
                        </div>
                        <div>
                            <Label htmlFor="subtitle" className="mb-2 text-sm md:text-base">Subtitle</Label>
                            <Input
                                type="text"
                                id="subtitle"
                                name="subtitle"
                                value={blogData.subtitle}
                                onChange={handleChange}
                                className='text-sm md:text-base dark:shadow-sm dark:shadow-gray-100/20'
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="mb-2 text-sm md:text-base">Description</Label>
                            <div className='overflow-x-auto'>
                                <JoditEditor
                                    ref={editor}
                                    className='jodit_toolbar min-w-full'
                                    value={blogData.description}
                                    onChange={newContent => setContent(newContent)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="category" className='mb-2 text-sm md:text-base'>Category</Label>
                            <Select value={blogData.category} onValueChange={selectCategory} >
                                <SelectTrigger className="w-full sm:w-[280px] md:w-[200px] dark:shadow-sm dark:shadow-gray-100/20 text-sm md:text-base">
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
                        <div>
                            <Label htmlFor="thumbnail" className="mb-2 text-sm md:text-base">Thumbnail</Label>
                            <Input
                                type="file"
                                id="thumbnail"
                                name="thumbnail"
                                accept="image/*"
                                className='w-full sm:w-fit text-sm md:text-base dark:shadow-sm dark:shadow-white/20'
                                onChange={selectThumbnail}
                            />
                            {
                                previewThumbnail && (
                                    <img src={previewThumbnail} className='w-full sm:w-64 my-2 rounded-lg' alt="blog-thumbnail" />
                                )
                            }
                        </div>
                        <div className='pt-2 flex flex-col sm:flex-row gap-3 sm:gap-5'>
                            <Button variant={"outline"} onClick={() => navigate(-1)} className='w-full sm:w-auto dark:text-white dark:hover:text-white'>Cancel</Button>
                            <Button onClick={updateBlogHandler} className='w-full sm:w-auto'>
                                {
                                    loading ? (
                                        <>
                                            <Loader2 className='mr-2 w-4 h-4 animate-spin' /> please wait
                                        </>
                                    ) : ("Publish")
                                }
                            </Button>
                        </div>
                    </div>
                </Card>
            </div >
        </div >
    )
}

export default UpdateBlog