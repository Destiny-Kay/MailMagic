import { Button, Container, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function WebNav() {
    const [showDropdown, setShowDropdown] = useState(false)

    return(
        <Container className="fixed top-0 left-0 w-full border-b-[1px] py-4 px-4 lg:px-8 bg-white">
            <Flex className="hidden lg:flex items-center justify-between">
                <Link to={"/"} className="text-2xl font-bold">Mail <span className="text-purple-700">Magic</span></Link>
                <Flex className="hidden lg:flex justify-between gap-4">
                    <NavLink to={'/'} className={({isActive}) => `px-4 py-1 font-bold ${isActive && "bg-purple-100 text-purple-700 rounded-lg"}`}>Home</NavLink>
                    <NavLink to={'/about'} className={({isActive}) => `px-4 py-1 font-bold ${isActive && "bg-purple-100 text-purple-700 rounded-lg"}`}>About</NavLink>
                </Flex>
                <Flex className="hidden lg:flex gap-4">
                    <Link to={"/auth/signup"}><Button className="cursor-pointer">Get started</Button></Link>
                    <Link to={'/auth/login'}><Button variant="outline" className="cursor-pointer">Login</Button></Link>
                </Flex>
            </Flex>
            {
                showDropdown ?
                    <div className="fixed top-0 left-0 lg:hidden bg-white w-full h-full">
                        <IoClose className="text-4xl text-purple-700 fixed right-6 top-4" onClick={() => setShowDropdown(false)}/>
                        <Flex className="mt-20 items-center justify-center flex-col">
                            <NavLink to={'/'} className={({isActive}) => `px-4 py-1 font-bold ${isActive && "bg-purple-100 text-purple-700 rounded-lg"}`}>Home</NavLink>
                            <NavLink to={'/about'} className={({isActive}) => `px-4 py-1 font-bold ${isActive && "bg-purple-100 text-purple-700 rounded-lg"}`}>About</NavLink>
                            <Flex className="flex-col mt-20 gap-4 w-3/4">
                                <Link to={"/auth/signup"}><Button className="cursor-pointer w-full">Get started</Button></Link>
                                <Link to={'/auth/login'}><Button variant="outline" className="cursor-pointer w-full">Login</Button></Link>
                            </Flex>
                        </Flex>
                    </div>
                    :
                    <Flex className="items-center justify-between px-4 lg:hidden">
                        <Link to={"/"} className="text-2xl font-bold">Mail <span className="text-purple-700">Magic</span></Link>
                        <GiHamburgerMenu className="text-purple-700 text-2xl" onClick={() => setShowDropdown(true)}/>
                    </Flex>
            }
        </Container>
    )
}
