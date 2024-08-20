import { BsEye, BsEyeSlash } from "react-icons/bs";
import AppLayout from "../../layouts/AppLayout";
import { Button, Container, Flex } from "@radix-ui/themes";
import { useState } from "react";

type passwordType = "password" | "text"
export default function Settings() {
    const [passwordType, setPasswordType] = useState<passwordType>("password")
    return(
        <AppLayout>
            <Container className="md:mt-32 md:w-2/3 mt-20 mx-6 md:m-auto">
                <p className="font-bold">Setup your email</p>
                <form>
                    <Flex className="flex-col">
                        <label>Email address</label>
                        <input className="border-2 rounded-lg px-2 h-[40px] max-w-[300px] focus:outline-purple-600"></input>
                    </Flex>
                    <Flex className="flex-col">
                        <label>Email password</label>
                        <div className="max-w-[300px] flex items-center px-2 border-2 rounded-lg">
                            <input type={passwordType} className="w-full  h-[40px] focus:outline-none"></input>

                            {
                                passwordType === "password" ?
                                <BsEyeSlash onClick={() => setPasswordType("text")} className="cursor-pointer" />
                                :
                                <BsEye onClick={() => setPasswordType("password")} className="cursor-pointer"/>
                            }
                        </div>
                    </Flex>
                    <Flex className="mt-4">
                        <Button className="cursor-pointer">Save</Button>
                    </Flex>
                </form>
            </Container>
        </AppLayout>
    )
}
