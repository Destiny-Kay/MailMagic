import { Flex, IconButton } from "@radix-ui/themes";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { LuLayoutDashboard, LuPencilLine, LuSettings } from "react-icons/lu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiContactsLine } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";

export default function AppSidebar() {
    const [sidebarOpen, setSidebarOPen] = useState(false)
    return (
        <div className="hidden md:block fixed left-0 top-0 pt-8 bg-white h-full border-r-2 w-fit mt-10  ">
            {/* <p className="font-bold text-xl px-4">Mail <span>Magic</span></p> */}
            <Flex className="w-full justify-end">
                <IconButton className="rounded-full text cursor-pointer">
                    {
                        sidebarOpen ?
                        <MdArrowBackIos onClick={() => setSidebarOPen(false)}/>
                        :
                        <MdArrowForwardIos onClick={() => setSidebarOPen(true)}/>
                    }
                </IconButton>
            </Flex>
            <Flex className="flex-col gap-1 mt-20">
                <NavLink to={'/app/dashboard'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                    <LuLayoutDashboard />
                    { sidebarOpen && <p>Dashboard</p>}
                </NavLink>
                <NavLink to={'/app/compose'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                    <LuPencilLine />
                    { sidebarOpen && <p>Compose</p>}
                </NavLink>
                <NavLink to={'/app/contacts'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                    <RiContactsLine />
                    { sidebarOpen && <p>Contacts</p>}
                </NavLink>
                <NavLink to={'/app/settings'} className={({isActive}) => `flex gap-2 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                    <LuSettings />
                    { sidebarOpen && <p>Settings</p>}
                </NavLink>
                <NavLink to={'/'} className={({isActive}) => `flex gap-2 mt-16 items-center px-4 py-2 ${isActive && "text-purple-700 bg-purple-100"}`}>
                    <SlLogout />
                    { sidebarOpen && <p>Logout</p>}
                </NavLink>
            </Flex>
        </div>
    )
}