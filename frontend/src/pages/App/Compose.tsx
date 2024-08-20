import { Button, Flex, Container, TextArea } from "@radix-ui/themes";
import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import ContactSelect from "../../components/ContactSelect";

type composeStage = "compose" | "contactSelection" | "preview"
type emailContent = {
    salutation: string,
    subject: string,
    body: string
}

export default function Compose() {
    // const [composeStage, setComposeStage] = useState<composeStage>("compose")
    const [composeStage, setComposeStage] = useState<composeStage>("contactSelection")
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
    })
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
                                className="p-2 h-fit tex border-[1px] border-black/20 rounded-sm focus:outline-purple-400"></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Email Subject</label>
                            <input
                                name="subject"
                                onChange={(event) => handleEmailFormChange(event)}
                                placeholder="LAUNCH OF OUR NEW PRODUCT"
                                className="p-2 h-fit tex border-[1px] border-black/20 rounded-sm focus:outline-purple-400"></input>
                        </div>
                        <label>Email body</label>
                        <TextArea
                            name="body"
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
                        <Container>
                            <p>This is a container element</p>
                        </Container>
                        <Flex className="w-full justify-center gap-2">
                            <Button variant="outline" className="px-4 cursor-pointer" onClick={() => setComposeStage("contactSelection")}>Back</Button>
                            <Button className="cursor-pointer" onClick={() => setComposeStage("preview")}>Send emails</Button>
                        </Flex>
                    </>
                }
            </Container>
        </AppLayout>
    )
}