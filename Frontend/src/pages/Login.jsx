import { Label } from "@radix-ui/react-label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "../Components/ui/card";
import React, { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../Redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
    // useNavigate from react router to navigate b/w route
    const navigate = useNavigate()

    // dispatch
    const dispatch = useDispatch();

    // 
    const { loading } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            // [name] :- for dynamic(d/f-d/f) name in d/f-d/f input field  
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input)

        try {

            dispatch(setLoading(true))

            const res = await axios.post(`http://localhost:8000/api/v1/user/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (res.data.success) {
                navigate("/");
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="flex h-screen md:pt-14 md:h-[760px]">
            <div className="flex justify-center items-center flex-1 px-4 md:px-0">
                <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-center text-xl font-semibold">
                                Login into your account
                            </h1>
                        </CardTitle>
                        <p className="mt-2 text-sm font-serif text-center">
                            Enter your details below to login your account
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form action="" className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <Label id="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    name="email"
                                    id="email"
                                    className="border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
                                    value={input.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <Label id="password">Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter Strong Password"
                                    name="password"
                                    id="password"
                                    className="border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
                                    value={input.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {
                                    loading ? (
                                        <>
                                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                            please wait
                                        </>
                                    )
                                        : ("Login")
                                }
                            </Button>
                            <p className="text-center text-gray-600 dark:text-white">
                                Don't have a account? &nbsp;
                                <Link to={"/signup"}>
                                    <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-300">
                                        Sign Up
                                    </span>
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login