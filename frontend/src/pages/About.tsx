import { Box, Container, Flex } from "@radix-ui/themes";
import WebLayout from "../layouts/WebLayout";
import "/about-image.jpg"

export default function About() {
    return(
        <WebLayout>
            <Container className="mt-20">
                <Flex className="items-center flex-col md:flex-row gap-4 h-svh">
                    <p className="text-xl md:text-3xl px-4 font-bold md:w-2/3">We make the emailing process simpler for our users. Realising the importance of time to peple we set out to make this process simpler for them.</p>
                    {/* PLACE A BETTER IMAGE HERE AND ADJUST THE HEIGHT AND WIDTH PROPERTIES TO MATCH */}
                    <img src="about-image.jpg" className="w-[600px] max-w-[90vw] h-[400px]"></img>
                </Flex>
                <Container className="">
                    <p className="text-2xl md:text-3xl font-extrabold text-center mb-4">Core values</p>
                    <Flex className="items-center justify-center flex-wrap mb-6 gap-6">
                        <Box className="w-[350px] h-[450px] max-w-[90vw] border-[1px] shadow-lg shadow-purple-300 border-purple-700 rounded-lg overflow-hidden pb-20">
                            <img src="about-image.jpg" className="h-[200px] w-full"></img>
                            <div className="py-6 px-4">
                                <p className="font-bold text-xl mb-2">Simplicity</p>
                                <p>We are always here to make thngs simple for our users. We are founded by simplicity in mind.</p>
                            </div>
                        </Box>
                        <Box className="w-[350px] h-[450px] lg:mt-20 max-w-[90vw] border-[1px] shadow-lg shadow-purple-300 border-purple-700 rounded-lg overflow-hidden pb-20">
                            <img src="about-image.jpg" className="h-[200px] w-full"></img>
                            <div className="py-6 px-4">
                                <p className="font-bold text-xl mb-2">We are on it.</p>
                                <p>Be guaranteed that we are always looking for ways to make the experience even better.</p>
                            </div>
                        </Box>
                        <Box className="w-[350px] h-[450px] max-w-[90vw] border-[1px] shadow-lg shadow-purple-300 border-purple-700 rounded-lg overflow-hidden pb-20">
                            <img src="about-image.jpg" className="h-[200px] w-full"></img>
                            <div className="py-6 px-4">
                                <p className="font-bold text-xl mb-2">Always the best.</p>
                                <p>We pride ourselves in delivering high quality services to our clientele. Trust us know ing that we will deliver it.</p>
                            </div>
                        </Box>
                    </Flex>
                </Container>
            </Container>
        </WebLayout>
    )
}