import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='bg-black mt-20 text-white border-t border-gray-500'>
            <div className='max-w-7xl mx-auto px-4 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Brand Section */}
                    <div className='col-span-1 md:col-span-2'>
                         <h2 className='text-3xl font-bold mb-4'>TechTribe</h2>
                        {/* <h2 className='text-3xl font-bold mb-4'>InnoInk</h2> */}
                        <p className='text-gray-300 mb-4'>
                            Your go-to platform for the latest insights in technology, development, and innovation.
                            Share your knowledge and connect with fellow tech enthusiasts.
                        </p>
                        <div className='flex space-x-4'>
                            <a href='https://github.com' target='_blank' rel='noopener noreferrer'
                                className='hover:text-gray-400 transition-colors'>
                                <FaGithub size={24} />
                            </a>
                            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'
                                className='hover:text-gray-400 transition-colors'>
                                <FaLinkedin size={24} />
                            </a>
                            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'
                                className='hover:text-gray-400 transition-colors'>
                                <FaTwitter size={24} />
                            </a>
                            <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'
                                className='hover:text-gray-400 transition-colors'>
                                <FaYoutube size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link to='/' className='hover:text-gray-400 transition-colors'>Home</Link>
                            </li>
                            <li>
                                <Link to='/blogs' className='hover:text-gray-400 transition-colors'>Blogs</Link>
                            </li>
                            <li>
                                <Link to='/about' className='hover:text-gray-400 transition-colors'>About</Link>
                            </li>
                            <li>
                                <Link to='/news' className='hover:text-gray-400 transition-colors'>News</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Contact</h3>
                        <ul className='space-y-2'>
                            <li className='flex items-center space-x-2'>
                                <MdEmail />
                                <a href='mailto:info@techtribe.com' className='hover:text-gray-400 transition-colors'>
                                    info@techtribe.com
                                </a>
                            </li>
                            <li>
                                <p className='text-gray-300'>Support</p>
                            </li>
                            <li>
                                <p className='text-gray-300'>Privacy Policy</p>
                            </li>
                            <li>
                                <p className='text-gray-300'>Terms of Service</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-[#2a2a2a] mt-8 pt-8 text-center'>
                    <p className='text-gray-300'>
                        &copy; {currentYear} TechTribe. All rights reserved. Built with ❤️ for developers.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
