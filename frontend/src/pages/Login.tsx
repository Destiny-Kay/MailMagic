import { Button, Flex } from "@radix-ui/themes";
import AuthLayout from "../layouts/AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";

type LoginForm = {
    email: string,
    password: string
}
export default function Login() {
    const [loginForm, setLoginForm] =  useState<LoginForm>({
        email: '',
        password: ''
    })
    const handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setLoginForm({...loginForm, [name]: value})
    }
    return(
        <AuthLayout>
            <Flex className="justify-center items-center min-h-[50vh]">
                <form className="border-2 px-4 pt-4 pb-10 rounded-lg border-purple-200 shadow-xl shadow-purple-200 w-[400px] max-w[90vw]">
                    <p className="font-bold text-xl">Mail <span className="text-purple-700">Magic</span></p>
                    <p className="mb-10">Don't have an account? <Link to={'/auth/signup'} className="text-purple-700 underline">Create one</Link></p>
                    <div>
                        <label className="block">Email</label>
                        <input
                            name="email"
                            onChange={(event) => handleLoginFormChange(event)}
                            className="w-full border-2 border-purple-400 h-[40px] focus:outline-none px-2 rounded-md"
                            placeholder="johndoe@email.com"></input>
                    </div>
                    <div>
                        <label className="block">Password</label>
                        <input
                            name="password"
                            onChange={(event) => handleLoginFormChange(event)}
                            className="w-full border-2 border-purple-400 h-[40px] focus:outline-none px-2 rounded-md"></input>
                    </div>
                    <Button className="w-full mt-8 py-5 cursor-pointer">Login</Button>
                </form>
            </Flex>
        </AuthLayout>
    )
}