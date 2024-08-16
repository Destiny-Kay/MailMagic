import { Flex } from "@radix-ui/themes";
import { TbBrandFacebook } from "react-icons/tb";
import { FiTwitter } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";

export default function Footer() {
    return(
        <Flex className="flex-wrap gap-10 md:justify-center px-4 py-10 bg-purple-700 text-white">
            <div>
                <p className="text-2xl font-bold">Mail <span className="text-black">Magic</span></p>
            </div>
            <div>
                <p className="font-bold text-xl mb-1">GET IN TOUCH</p>
                <Flex className="gap-4 text-2xl">
                    <TbBrandFacebook  className="cursor-pointer"/>
                    <FiTwitter className="cursor-pointer"/>
                    <LuLinkedin className="cursor-pointer"/>
                </Flex>
            </div>
            <div>
                <p className="font-bold text-xl mb-1">PLATFORM</p>
                <p>Create an account</p>
                <p>Login to your account</p>
            </div>
            <div>
                <p className="font-bold text-xl mb-1">LEGAL</p>
                <p>Cookie policy</p>
                <p>Privacy policy</p>
            </div>
        </Flex>
    )
}