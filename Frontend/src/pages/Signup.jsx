import { Label } from "@radix-ui/react-label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../Components/ui/card";
import React, { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../Redux/authSlice";
import { Loader2 } from "lucide-react";
import api from "@/Config/axios";

function Signup() {

    const navigate = useNavigate()

    const { loading } = useSelector(store => store.auth)

    const dispatch = useDispatch()

    const [users, setUsers] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers((prev) => ({
            ...prev,
            // [name] :- for dynamic(d/f-d/f) name in d/f-d/f input field  
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user)

        try {

            dispatch(setLoading(true))

            const res = await api.post(`/api/v1/user/register`, users, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Signup failed')
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
                                Create an account
                            </h1>
                        </CardTitle>
                        <p className="mt-2 text-sm font-serif text-center">
                            Enter your details below to create your account
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form action="" className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    id="name"
                                    className="border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
                                    value={users.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your username"
                                    name="username"
                                    id="username"
                                    className="border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
                                    value={users.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    name="email"
                                    id="email"
                                    className="border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
                                    value={users.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative ">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter Strong Password"
                                    name="password"
                                    id="password"
                                    className="border-gray-300 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
                                    value={users.password}
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
                                        : ("Sign Up")
                                }
                            </Button>
                            <p className="text-center text-gray-600 dark:text-white">
                                Already have a account? &nbsp;
                                <Link to={"/login"}>
                                    <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-300">
                                        Sign in
                                    </span>
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Signup;
