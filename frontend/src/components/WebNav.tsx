import { Button, Container, Flex } from "@radix-ui/themes";
import { NavLink, Link } from "react-router-dom";

export default function WebNav() {
    return(
        <Container className="fixed top-0 left-0 w-full border-b-[1px] py-4 bg-white">
            <Flex className="items-center justify-between">
                <Link to={"/"} className="text-2xl font-bold">Mail <span className="text-purple-700">Magic</span></Link>
                <Flex className="justify-between gap-4">
                    <NavLink to={'/'} className={({isActive}) => `px-4 py-1 font-bold ${isActive && "bg-purple-100 text-purple-700 rounded-lg"}`}>Home</NavLink>
                    <NavLink to={'/about'} className={({isActive}) => `px-4 py-1 font-bold ${isActive && "bg-purple-100 text-purple-700 rounded-lg"}`}>About</NavLink>
                </Flex>
                <Flex className="gap-4">
                    <Button className="cursor-pointer">Get started</Button>
                    <Button variant="outline" className="cursor-pointer">Login</Button>
                </Flex>
            </Flex>
        </Container>
    )
}
