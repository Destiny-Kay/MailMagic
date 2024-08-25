import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { Flex, Button, Checkbox } from "@radix-ui/themes";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "/signup-image.jpg"

type signupForm = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatPass: string
}
type passwordType = "text" | "password"

export default function Signup() {
    const [passwordType, setPasswordType] = useState<passwordType>("password")
    const [signupForm, setSignupForm] = useState<signupForm>(
        {
            firstName:'',
            lastName: '',
            email: '',
            password: '',
            repeatPass: ''
        }
    )
    const handleSignupFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setSignupForm({...signupForm, [name]: value})
    }

    return (
        <AuthLayout>
            <div className="flex flex-col max-w-full justify-center items-center md:items-start">
                <p className="mb-12 text-xl font-bold">Create your account.</p>
                <p className="mb-2 text-sm font-bold">Have an accont? <Link className="text-purple-700 underline" to={'/auth/login'}>Go to Login</Link></p>
                <div className="flex max-w-[90vw]">
                    <form className="border-2 border-purple-300 shadow-xl shadow-purple-200 p-4 rounded-md mx-1">
                        <Flex className="gap-2 flex-col md:flex-row">
                            <div>
                                <label className="block">First name <span className="text-red-500">*</span></label>
                                <input
                                    onChange={(event) => handleSignupFormChange(event)}
                                    name="firstName"
                                    className="w-full border-2 border-purple-400 focus:outline-none rounded-md h-[40px] px-2" placeholder="John"></input>
                            </div>
                            <div>
                                <label className="block">Last name <span className="text-red-500">*</span></label>
                                <input
                                    onChange={(event) => handleSignupFormChange(event)}
                                    name="lastName"
                                    className="w-full border-2 border-purple-400 focus:outline-none rounded-md h-[40px] px-2" placeholder="Doe"></input>
                            </div>
                        </Flex>
                        <div>
                            <label className="block">Email</label>
                            <input
                                onChange={(event) => handleSignupFormChange(event)}
                                name="email"
                                className="w-full border-2 border-purple-400 focus:outline-none rounded-md h-[40px] px-2" placeholder="johndoe@email.com"></input>
                        </div>
                        <div>
                            <label className="block">Password</label>
                            <div className="flex items-center w-full border-2 border-purple-400 rounded-md h-[40px]">
                                <input
                                    onChange={(event) => handleSignupFormChange(event)}
                                    name="password"
                                    type={passwordType} className="w-11/12 focus:outline-none px-2"></input>
                                {
                                    passwordType == "password" ?
                                    <FaRegEyeSlash className="text-3xl text-purple-700" onClick={() => setPasswordType("text")}/>
                                    :
                                    <FaRegEye className="text-3xl text-purple-700" onClick={() => setPasswordType("password")}/>
                                }
                            </div>
                        </div>
                        <div>
                            <label className="block">Repeat password</label>
                            <input
                                onChange={(event) => handleSignupFormChange(event)}
                                name="repeatPass"
                                type="password" className="w-full border-2 border-purple-400 focus:outline-none rounded-md h-[40px] px-2"></input>
                        </div>
                        <Flex className="mt-6 gap-2 items-center">
                            <Checkbox />
                            <p className="text-sm italic font-bold">I agree to all terms and conditions and the privacy policy.</p>
                        </Flex>
                        <div>
                            <Button className="w-full mt-6 py-6 cursor-pointer">Create account</Button>
                        </div>
                    </form>
                    <div className="hidden lg:block">
                        <img className="" src="signup-image.jpg"></img>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}