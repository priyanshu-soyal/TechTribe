import { AvatarImage } from "@/Components/ui/avatar"
import { Card } from "@/Components/ui/card"
import { Avatar } from "@radix-ui/react-avatar"
import { Label } from "@/Components/ui/label"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import { Link } from "react-router-dom"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { toast } from "sonner"
import { setLoading, setUser } from "@/Redux/authSlice"
import axios from "axios"
import { Loader2 } from "lucide-react"


function Profile() {

    const { user, loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const [input, setInput] = useState({
        name: user?.name,
        username: user?.username,
        linkedin: user?.linkedin,
        github: user?.github,
        instagram: user?.instagram,
        facebook: user?.facebook,
        occupation: user?.occupation,
        bio: user?.bio,
        profilePicture: user?.profilePicture,
    })

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, profilePicture: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(input)
        const formData = new FormData();
        formData.append("name", input.name)
        formData.append("username", input.username)
        formData.append("linkedin", input.linkedin)
        formData.append("github", input.github)
        formData.append("instagram", input.instagram)
        formData.append("facebook", input.facebook)
        formData.append("bio", input.bio)
        formData.append("occupation", input.occupation)
        if (input?.profilePicture) {
            formData.append("profilePicture", input.profilePicture)
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
                setOpen(false)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="pt-20 md:ml-80 md:h-screen">
            <div className="max-w-6xl mx-auto mt-8">
                <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-[#1a1a1a] mx-4 md:mx-0">
                    {/* Image Section */}
                    <div className="flex flex-col items-center justify-center md:w-[400px]">
                        <Avatar className="w-40 h-40 border-2 rounded-full">
                            <AvatarImage className="rounded-full" src={user.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"} />
                        </Avatar>
                        <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-white my-3">{user.occupation || "Engineer"}</h1>
                        <div className="flex gap-4 items-center">
                            <Link to={user.linkedin}> <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-white" /> </Link>
                            <Link to={user.github}> <FaGithub className="w-6 h-6 text-gray-800 dark:text-white" /> </Link>
                            <Link to={user.instagram}> <FaInstagram className="w-6 h-6 text-gray-800 dark:text-white" /> </Link>
                            <Link to={user.facebook}> <FaFacebook className="w-6 h-6 text-gray-800 dark:text-white" /> </Link>
                        </div>
                    </div>
                    {/* Info Section */}
                    <div>
                        <h1 className="font-bold text-center md:text-start text-4xl mb-7">Welcome {user.username || "user"}!</h1>
                        <p><span className="font-semibold">Email : </span> {user.email || "example@gmail.com"}</p>
                        <div className="flex flex-col gap-2 items-start justify-start my-5">
                            <Label className="font-bold text-2xl">Bio</Label>
                            <pre className=" whitespace-pre-line border dark:border-[#2a2a2a] p-6 rounded-lg">{user.bio || "Enter your bio"}</pre>
                        </div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <Button onClick={() => setOpen(true)}>Edit Profile</Button>
                            <DialogContent className="sm:max-w-[450px]">
                                <form encType="multipart/form-data" onSubmit={submitHandler}>
                                    <DialogHeader>
                                        <DialogTitle className="text-center">Edit profile</DialogTitle>
                                        <DialogDescription className="text-center">
                                            Make changes to your profile here. Click save when you&apos;re
                                            done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="flex justify-between gap-2">
                                            <div className="mb-2 flex-1">
                                                <Label htmlFor="name" className="mb-1">Name</Label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="w-full"
                                                    value={input.name}
                                                    onChange={changeEventHandler}
                                                />
                                            </div>
                                            <div className="mb-2 flex-1">
                                                <Label htmlFor="username" className="mb-1">Username</Label>
                                                <Input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    className="w-full"
                                                    value={input.username}
                                                    onChange={changeEventHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            <div className="mb-2 flex-1">
                                                <Label htmlFor="linkedin" className="mb-1">Linkedin</Label>
                                                <Input
                                                    type="text"
                                                    id="linkedin"
                                                    name="linkedin"
                                                    placeholder="Enter linkedin URL"
                                                    className="w-full"
                                                    value={input.linkedin}
                                                    onChange={changeEventHandler}
                                                />
                                            </div>
                                            <div className="mb-2 flex-1">
                                                <Label htmlFor="github" className="mb-1">Github</Label>
                                                <Input
                                                    type="text"
                                                    id="github"
                                                    name="github"
                                                    placeholder="Enter Github URL"
                                                    className="w-full"
                                                    value={input.github}
                                                    onChange={changeEventHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            <div className="mb-2 flex-1">
                                                <Label htmlFor="instagram" className="mb-1">Instagram</Label>
                                                <Input
                                                    type="text"
                                                    id="instagram"
                                                    name="instagram"
                                                    placeholder="Enter instagram URL"
                                                    className="w-full"
                                                    value={input.instagram}
                                                    onChange={changeEventHandler}
                                                />
                                            </div>
                                            <div className="mb-2 flex-1">
                                                <Label htmlFor="facebook" className="mb-1">Facebook</Label>
                                                <Input
                                                    type="text"
                                                    id="facebook"
                                                    name="facebook"
                                                    placeholder="Enter facebook URL"
                                                    className="w-full"
                                                    value={input.facebook}
                                                    onChange={changeEventHandler}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <Label htmlFor="occupation" className="mb-1">Occupation</Label>
                                            <Input
                                                type="text"
                                                id="occupation"
                                                name="occupation"
                                                className="w-full"
                                                value={input.occupation}
                                                onChange={changeEventHandler}
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <Label htmlFor="bio" className="mb-1">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                name="bio"
                                                placeholder="Write short bio.."
                                                className="w-full whitespace-pre-line h-[100px] "
                                                value={input.bio}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <Label htmlFor="profilePicture" className="mb-1">Profile</Label>
                                            <Input
                                                type="file"
                                                id="profilePicture"
                                                name="profilePicture"
                                                className="w-[300px]"
                                                accept="image/*"
                                                onChange={changeFileHandler}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" type="button">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">
                                            {
                                                loading ? (
                                                    <>
                                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                                        please wait
                                                    </>
                                                ) : ("Save Changes")
                                            }
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>
            </div >
        </div >
    )
}

export default Profile