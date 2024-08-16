import { Flex, Box, Button, Grid } from "@radix-ui/themes";
import WebLayout from "../layouts/WebLayout";
import "/landing-image.png"
import { IoIosTimer } from "react-icons/io";
import { MdOutlineSpeed } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Landing() {
    return(
        <WebLayout>
            <div className="border-2 mb-0 mt-16">
                <Flex className="mt-20 items-center justify-center h-full flex-col px-4">
                    <p className="text-4xl md:text-6xl text-black font-extrabold text-center max-w-[900px]">Get your E-Mails to the right inbox <span className="text-purple-700">{"\u{1F4E8}"} Fast.</span></p>
                    <p className="max-w-[800px] md:text-lg font-bold mt-12">Don't waste time even thinking of sending those mass emails to your contacts. Leave the workload to us, we help you send those emails without breaking a sweat. Manage your contacts, send mails and get send receipts faster with us.</p>
                    <Link to={"/auth/signup"}><Button variant="outline" className="text-sm lg:text-xl px-20 py-6 mt-8 cursor-pointer">Get started now</Button></Link>
                </Flex>
                <Flex className="items-center justify-center w-full mt-16 overflow-hidden px-4">
                    <div className=" max-w-full w-[900px] max-h-[400px]">
                        <img src="landing-image.png" className="w-full rounded-t-2xl"></img>
                    </div>
                </Flex>
                <div className="text-center w-full bg-purple-700 py-8">
                    <p className="text-white md:text-3xl font-extrabold">Get faster with Magic Mailer</p>
                    <Flex className="gap-4 flex-wrap justify-center mt-10">
                        <Box className= "bg-white px-4 py-8 rounded-2xl w-[300px] text-left">
                            <MdOutlineSpeed className="text-5xl"/>
                            <p className="font-bold text-lg text-purple-700 mt-4">300% faster.</p>
                            <p>Get faster email sending by just the click of a button. Make this process faster with Magic Mailer.</p>
                        </Box>
                        <Box className="bg-white px-4 py-8 rounded-2xl w-[300px] text-left">
                            <IoIosTimer className="text-5xl"/>
                            <p className="font-bold text-lg text-purple-700 mt-4">Save time while at it.</p>
                            <p>We take 2 seconds to draft and send emails to more than 100 people in 2 seconds.</p>
                        </Box>
                        <Box className="bg-white px-4 py-8 rounded-2xl w-[300px] text-left">
                            <RiContactsLine className="text-5xl"/>
                            <p className="font-bold text-lg text-purple-700 mt-4">All contacts in one place.</p>
                            <p>Manage all your contacts from one place. Don't guess E-mail addresses while sending emails.</p>
                        </Box>
                    </Flex>
                </div>
                <div className="mt-10 text-center">
                    <p className="text-xl md:text-4xl font-extrabold">Emailing has never been this easy!!</p>
                    <Grid className="grid-cols-1 md:grid-cols-2 mt-10 items-center gap-8">
                        <p className="text-3xl font-bold text-purple-700">Create an account</p>
                        <p className="h-[400px] border-2 border-blue-400">Image here</p>
                        <p className="text-3xl font-bold text-purple-700">Create your contacts</p>
                        <p className="md:row-start-2 h-[400px] border-2 border-blue-400">IMage here</p>
                        <p className="text-3xl font-bold text-purple-700">Send Emails to your contacts</p>
                        <p className="h-[400px] border-2 border-blue-400">Send image</p>
                    </Grid>
                </div>
                <p className="text-xl md:text-4xl text-center mt-10 font-extrabold">Let's get that message into their inbox.</p>
            </div>
        </WebLayout>
    )
}