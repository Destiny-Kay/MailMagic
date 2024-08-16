import { Flex } from "@radix-ui/themes";
import WebLayout from "../layouts/WebLayout";

export default function Landing() {
    return(
        <WebLayout>
            <div className="border-2 mb-0 h-svh  mt-16">
                <Flex className="items-center justify-center h-full">
                    <p className="text-4xl font-extrabold text-center">Get your E-Mails to the right inbox Fast.</p>
                </Flex>
            </div>
        </WebLayout>
    )
}