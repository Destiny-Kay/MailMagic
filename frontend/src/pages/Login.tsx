import { Button, Flex } from "@radix-ui/themes";
import AuthLayout from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../lib/requestHandler";

type LoginForm = {
    email: string,
    password: string
}
export default function Login() {
    const navigate = useNavigate()
    const [loginForm, setLoginForm] =  useState<LoginForm>({
        email: '',
        password: ''
    })
    const handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setLoginForm({...loginForm, [name]: value})
    }
    const handleLogin = (event: React.FormEvent<SubmitEvent> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        api.post('/app/login', loginForm)
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access)
                localStorage.setItem('refresh', response.data.refresh)
                navigate('/app')
            }
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 403) {
                    alert("The password or username is incorrect")
                }
                if (error.response.status === 404) {
                    alert("The user does not exist")
                }
            }
            else {
                alert(error)
            }
        })
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
                            type="password"
                            onChange={(event) => handleLoginFormChange(event)}
                            className="w-full border-2 border-purple-400 h-[40px] focus:outline-none px-2 rounded-md"></input>
                    </div>
                    <Button className="w-full mt-8 py-5 cursor-pointer" onClick={(event) => handleLogin(event)}>Login</Button>
                </form>
            </Flex>
        </AuthLayout>
    )
}