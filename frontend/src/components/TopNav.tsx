import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutDashboard, LuPencilLine, LuSettings } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { SlLogout } from "react-icons/sl";

export default function TopNav() {
    const [dropdownNavOpen, setDropDownNavOpen] = useState(false)
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }
    return(
        <div className="z-40 fixed top-0 bg-white w-full flex justify-between items-center px-4 py-2 border-b-2">
            <Link to={"/"} className="font-bold">Mail <span className="text-purple-700">Magic</span></Link>
            {/* MobileNav */}
            {/* <div className="md:hidden"> */}
                {
                    dropdownNavOpen ?
                    <Flex className="md:hidden flex-col p-8 fixed top-0 left-0 w-full h-full bg-white">
                        <IoMdClose className="text-2xl mb-8" onClick={() => setDropDownNavOpen(false)}/>
                        <NavLink to={'/app/dashboard'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                            <LuLayoutDashboard />
                            <p>Dashboard</p>
                        </NavLink>
                        <NavLink to={'/app/compose'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                            <LuPencilLine />
                            <p>Compose</p>
                        </NavLink>
                        <NavLink to={'/app/contacts'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                            <RiContactsLine />
                            <p>Contacts</p>
                        </NavLink>
                        <NavLink to={'/app/settings'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                            <LuSettings />
                            <p>Settings</p>
                        </NavLink>
                        <Flex className="flex gap-2 mt-16 items-center px-4 py-2 cursor-pointer" onClick={() => handleLogout()}>
                            <SlLogout />
                            <p>Logout</p>
                        </Flex>
                    </Flex>
                    :
                    <GiHamburgerMenu className="text-xl md:hidden" onClick={() => setDropDownNavOpen(true)}/>
                }
            {/* </div> */}
        </div>
    )
}