import { Button, Flex, Container, TextArea } from "@radix-ui/themes";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";

type composeStage = "compose" | "contactSelection" | "preview"
export default function Compose() {
    const [composeStage, setComposeStage] = useState<composeStage>("compose")
    return(
        <AppLayout>
            <Container className="md:mt-32 md:w-2/3 mt-20 mx-6 md:m-auto">
                {
                    composeStage === "compose" &&
                    <>
                        <p className="font-bold text-2xl mb-8">Compose your email</p>
                        <div className="flex flex-col gap-2">
                            <label>Email Salutation</label>
                            <input placeholder="Dear" className="p-2 h-fit tex border-[1px] border-black/20 rounded-sm focus:outline-purple-400"></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Email Subject</label>
                            <input placeholder="LAUNCH OF OUR NEW PRODUCT" className="p-2 h-fit tex border-[1px] border-black/20 rounded-sm focus:outline-purple-400"></input>
                        </div>
                        <label>Email body</label>
                        <TextArea placeholder="Enter email body." className="min-h-[100px] h-fit"/>
                        <Flex className="mt-8 justify-center">
                            <Button className="px-10 cursor-pointer" onClick={() => setComposeStage("contactSelection")}>Select contacts</Button>
                        </Flex>
                    </>
                }
                {
                    composeStage === "contactSelection" &&
                    <>
                        <p>Select contacts to send email message to </p>
                        <Flex className="w-full justify-center gap-2">
                            <Button variant="outline" className="px-4 cursor-pointer" onClick={() => setComposeStage("compose")}>Back</Button>
                            <Button className="cursor-pointer" onClick={() => setComposeStage("preview")}>Preview</Button>
                        </Flex>
                    </>
                }
                {
                    composeStage === "preview" &&
                    <>
                        <p>Preview your email message</p>
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