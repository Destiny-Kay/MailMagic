import { Flex } from "@radix-ui/themes";
import WebLayout from "../layouts/WebLayout";

export default function Landing() {
    return(
        <WebLayout>
            <div className="border-2 mb-0 h-svh  mt-16">
                <Flex className="items-center justify-center h-full flex-col">
                    <p className="text-4xl lg:text-6xl text-black font-extrabold text-center">Get your E-Mails to the right inbox Fast.</p>
                    <p>Don't waste time even thinking of sending those emails. Leave the workload to us, we help you send those emails without breaking a sweat</p>
                </Flex>
            </div>
        </WebLayout>
    )
}