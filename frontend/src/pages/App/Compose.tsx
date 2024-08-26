import { Button, Flex, Container, TextArea } from "@radix-ui/themes";
import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import ContactSelect from "../../components/ContactSelect";
import * as Dialog from "@radix-ui/react-dialog"

type composeStage = "compose" | "contactSelection" | "preview"
type emailContent = {
    salutation: string,
    subject: string,
    body: string
}

function SendEmailPopup() {
    return(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="cursor-pointer">Send Emails</Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                    <Dialog.Title>Confirm sending emails to selected contacts</Dialog.Title>
                    <Flex className="gap-2 mt-4 items-center justify-center">
                        <Dialog.Close><button className="border-2 border-purple-500 px-4 py-1 rounded-md text-purple-600 font-bold cursor-pointer">Cancel</button></Dialog.Close>
                        <Dialog.Close><button className="border-none px-4 py-1 rounded-md text-white bg-purple-600 font-bold cursor-pointer">Confirm</button></Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
export default function Compose() {
    const [composeStage, setComposeStage] = useState<composeStage>("compose")
    const [emailContent, setEmailContent] = useState<emailContent>({
        salutation: '',
        subject: '',
        body: ''
    })
    const handleEmailFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setEmailContent({...emailContent, [name]: value})
    }
    const [emailContentValid, setEmailContentValid] = useState<boolean>(false)
    useEffect(() => {
       if (emailContent.body.length > 20 && emailContent.salutation.length >= 2 && emailContent.subject.length > 10) {
            setEmailContentValid(true)
        }
        else {
            setEmailContentValid(false)
        }
    }, [emailContent.body.length, emailContent.salutation.length, emailContent.subject.length])
    return(
        <AppLayout>
            <Container className="md:mt-32 md:w-2/3 mt-20 mx-6 md:m-auto">
                {
                    composeStage === "compose" &&
                    <>
                        <p className="font-bold text-xl mb-8">Compose your email</p>
                        <div className="flex flex-col gap-2">
                            <label>Email Salutation</label>
                            <input
                                name="salutation"
                                onChange={(event) => handleEmailFormChange(event)}
                                placeholder="Dear"
                                defaultValue={emailContent.salutation}
                                className="p-2 h-fit tex border-[1px] border-black/20 rounded-sm focus:outline-purple-400"></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Email Subject</label>
                            <input
                                name="subject"
                                defaultValue={emailContent.subject}
                                onChange={(event) => handleEmailFormChange(event)}
                                placeholder="LAUNCH OF OUR NEW PRODUCT"
                                className="p-2 h-fit tex border-[1px] border-black/20 rounded-sm focus:outline-purple-400"></input>
                        </div>
                        <label>Email body</label>
                        <TextArea
                            name="body"
                            defaultValue={emailContent.body}
                            onChange={(event) => handleEmailFormChange(event)}
                            placeholder="Enter email body."
                            className="min-h-[100px] h-fit"/>
                        <Flex className="mt-8 justify-center">
                            {
                                emailContentValid ?
                                <Button className="px-10 cursor-pointer" onClick={() => setComposeStage("contactSelection")}>Select contacts</Button>
                                :
                                <Button className="px-10 cursor-pointer" disabled>Select contacts</Button>
                            }
                        </Flex>
                    </>
                }
                {
                    composeStage === "contactSelection" &&
                    <>
                        <p className="font-bold text-xl mb-8">Select contacts to send email message to </p>
                        <ContactSelect />
                        <Flex className="w-full justify-center gap-2 mt-6">
                            <Button variant="outline" className="px-4 cursor-pointer" onClick={() => setComposeStage("compose")}>Back</Button>
                            <Button className="cursor-pointer" onClick={() => setComposeStage("preview")}>Preview</Button>
                        </Flex>
                    </>
                }
                {
                    composeStage === "preview" &&
                    <>
                        <p className="font-bold text-xl mb-8">Preview your email message</p>
                        <Container className="border-[1px] p-2 rounded-lg">
                            <p><span className="font-bold">Email subject: </span> {emailContent.subject}</p>
                            <div className="border-[1px] p-2 rounded-lg mt-6">
                                <p>{emailContent.salutation} John,</p>
                                <p>{emailContent.body}</p>
                            </div>
                        </Container>
                        <Flex className="w-full mt-4 justify-center gap-2">
                            <Button variant="outline" className="px-4 cursor-pointer" onClick={() => setComposeStage("contactSelection")}>Back</Button>
                            {/* <Button className="cursor-pointer" onClick={() => setComposeStage("preview")}>Send emails</Button> */}
                            <SendEmailPopup />
                        </Flex>
                    </>
                }
            </Container>
        </AppLayout>
    )
}