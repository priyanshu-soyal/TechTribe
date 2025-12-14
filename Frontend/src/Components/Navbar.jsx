import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartBarBig, ChartColumnBig, LogOut, Menu, Search, User, X } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../Redux/themeSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '../Redux/authSlice'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"

function Navbar() {

    const { user } = useSelector(store => store.auth)
    const { theme } = useSelector(store => store.theme)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, { withCredentials: true })
            if (res.data.success) {
                navigate("/")
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error)

        }
    }

    return (
        <>
            <div className='py-2 fixed w-full dark:bg-black bg-white dark:border-b-[#2a2a2a] border-b-gray-300 shadow-md z-50'>
                <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
                    {/* Logo Section */}
                    <div className='flex gap-2 md:gap-7 items-center'>
                        <Link to='/'>
                            <div className='flex gap-2 items-center'>
                                <img src="https://images.unsplash.com/vector-1739891193811-715e6efae0d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY0fHxsb2dvfGVufDB8fDB8fHww" alt="logo" className='rounded-full w-7 h-7 md:w-10 md:h-10 dark:invert' />
                                <h1 className='font-bold text-xl sm:text-2xl md:text-4xl'>TechTribe</h1>
                            </div>
                        </Link>
                        {/* <div className='relative hidden md:block'>
                            <Input
                                type="text"
                                placeholder="Search..."
                                className='border border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] bg-gray-100 w-[300px] focus:ring-black'
                            />
                            <Button className='absolute right-0 top-0 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black'> <Search /> </Button>
                        </div> */}
                    </div>
                    {/* Nav section */}
                    <nav className='flex gap-2 md:gap-7 items-center'>
                        <ul className='hidden md:flex gap-4 lg:gap-7 items-center text-base lg:text-xl font-semibold'>
                            <Link to={"/"}> <li>Home</li> </Link>
                            <Link to={"/blogs"}> <li>Blogs</li> </Link>
                            <Link to={"/about"}> <li>About</li> </Link>
                        </ul>
                        <div className='flex items-center gap-2'>
                            <Button onClick={() => dispatch(toggleTheme())} size="icon" className="h-9 w-9">
                                {
                                    theme === 'light' ? <FaMoon /> : <FaSun />
                                }
                            </Button>
                            {
                                user ? (
                                    <>
                                        {/* Desktop Profile Dropdown - Always visible */}
                                        <div className='hidden md:flex gap-2 md:gap-3 items-center'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Avatar className="cursor-pointer">
                                                        <AvatarImage src={user.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"}></AvatarImage>
                                                        <AvatarFallback>U</AvatarFallback>
                                                    </Avatar>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end">
                                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                                                            <User />
                                                            <span>Profile</span>
                                                            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => navigate("/dashboard/your-blogs")}>
                                                            <ChartColumnBig />
                                                            <span>Your Blogs</span>
                                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => navigate("/dashboard/create-blog")}>
                                                            <FaRegEdit />
                                                            <span>Create Blog</span>
                                                            <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={logoutHandler}>
                                                        <LogOut />
                                                        <span>Log out</span>
                                                        <DropdownMenuShortcut>⌘&#8680;</DropdownMenuShortcut>
                                                    </DropdownMenuItem>

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        {/* Mobile Profile Avatar - Always visible on mobile */}
                                        <Avatar className="md:hidden cursor-pointer">
                                            <AvatarImage src={user.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    </>
                                ) : (
                                    <>
                                        {/* Desktop Login/Signup */}
                                        <div className='hidden md:flex gap-2'>
                                            <Link to={"/login"}> <Button>Login</Button> </Link>
                                            <Link to={"/signup"}> <Button>Signup</Button> </Link>
                                        </div>
                                        {/* Mobile Login Button */}
                                        <Link to={"/login"} className="md:hidden">
                                            <Button size="sm">Login</Button>
                                        </Link>
                                    </>
                                )
                            }
                            {/* Hamburger Menu Button */}
                            <Button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                size="icon"
                                variant="ghost"
                                className="md:hidden h-9 w-9"
                            >
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </Button>
                        </div>
                    </nav>
                </div >
            </div >

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='fixed top-[52px] left-0 right-0 bg-white dark:bg-black border-b dark:border-[#2a2a2a] border-gray-300 shadow-lg z-40 md:hidden'>
                    <div className='flex flex-col p-4 space-y-4'>
                        {/* Mobile Search */}
                        <div className='relative'>
                            <Input
                                type="text"
                                placeholder="Search..."
                                className='border border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] bg-gray-100 w-full pr-10'
                            />
                            <Button size="icon" className='absolute right-0 top-0 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black h-9 w-9'>
                                <Search className='h-4 w-4' />
                            </Button>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className='flex flex-col space-y-2'>
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-md font-semibold'>
                                Home
                            </Link>
                            <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-md font-semibold'>
                                Blogs
                            </Link>
                            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-md font-semibold'>
                                About
                            </Link>
                        </div>

                        {/* Mobile User Section */}
                        {user ? (
                            <div className='flex flex-col space-y-2 border-t dark:border-[#2a2a2a] border-gray-300 pt-4'>
                                <Link to="/dashboard/profile" onClick={() => setMobileMenuOpen(false)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-md flex items-center gap-2'>
                                    <User className='h-4 w-4' />
                                    <span>Profile</span>
                                </Link>
                                <Link to="/dashboard/your-blogs" onClick={() => setMobileMenuOpen(false)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-md flex items-center gap-2'>
                                    <ChartColumnBig className='h-4 w-4' />
                                    <span>Your Blogs</span>
                                </Link>
                                <Link to="/dashboard/create-blog" onClick={() => setMobileMenuOpen(false)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-md flex items-center gap-2'>
                                    <FaRegEdit className='h-4 w-4' />
                                    <span>Create Blog</span>
                                </Link>
                                <button onClick={(e) => { logoutHandler(e); setMobileMenuOpen(false); }} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-md flex items-center gap-2 text-left'>
                                    <LogOut className='h-4 w-4' />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className='flex flex-col space-y-2 border-t dark:border-[#2a2a2a] border-gray-300 pt-4'>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className='w-full'>Login</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className='w-full'>Signup</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar