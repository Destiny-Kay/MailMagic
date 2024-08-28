import { Button, Flex, Container, TextArea, Tabs, Table, Checkbox } from "@radix-ui/themes";
import AppLayout from "../../layouts/AppLayout";
import React, { useEffect, useState } from "react";
// import ContactSelect from "../../components/ContactSelect";
import { api } from "../../lib/requestHandler";
import * as Dialog from "@radix-ui/react-dialog"

type composeStage = "compose" | "contactSelection" | "preview"
type emailContent = {
    salutation: string,
    subject: string,
    message: string,
    recipients: string[],
    sender_email: string
}
type contact = {
    name: string,
    email: string,
    id: number
}
type group = {
    id: number,
    name: string,
    contacts: string[],
    description: string
}
type emailAccount = {
    name: string,
    email_address: string
}

// function SendEmailPopup() {
//     return(
//         <Dialog.Root>
//             <Dialog.Trigger>
//                 <Button className="cursor-pointer">Send Emails</Button>
//             </Dialog.Trigger>

//             <Dialog.Portal>
//                 <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
//                 <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
//                     <Dialog.Title>Confirm sending emails to selected contacts</Dialog.Title>
//                     <Flex className="gap-2 mt-4 items-center justify-center">
//                         <Dialog.Close><button className="border-2 border-purple-500 px-4 py-1 rounded-md text-purple-600 font-bold cursor-pointer">Cancel</button></Dialog.Close>
//                         <Dialog.Close><button className="border-none px-4 py-1 rounded-md text-white bg-purple-600 font-bold cursor-pointer">Confirm</button></Dialog.Close>
//                     </Flex>
//                 </Dialog.Content>
//             </Dialog.Portal>
//         </Dialog.Root>
//     )
// }


export default function Compose() {
    const [composeStage, setComposeStage] = useState<composeStage>("compose")
    const [emailContent, setEmailContent] = useState<emailContent>({
        salutation: '',
        subject: '',
        message: '',
        recipients: [],
        sender_email: ''
    })
    const handleEmailFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setEmailContent({...emailContent, [name]: value})
    }
    const [emailContentValid, setEmailContentValid] = useState<boolean>(false)
    const [contacts, setContacts] = useState<contact[]>([])
    const [groups, setGroups] = useState<group[]>([])
    const [emailAccounts, setEmailAccounts] = useState<emailAccount[]>([])
    useEffect(() => {
       if (emailContent.message.length > 20 && emailContent.salutation.length >= 2 && emailContent.subject.length > 10) {
            setEmailContentValid(true)
        }
        else {
            setEmailContentValid(false)
        }
    }, [emailContent.message.length, emailContent.salutation.length, emailContent.subject.length])
    useEffect(() => {
        api.get('/app/contacts')
        .then((response) => {
            if (response.status === 200) {
                setContacts(response.data.data)
            }
        })
        api.get('/app/contactgroups')
        .then((response) => {
            if (response.status === 200) {
                setGroups(response.data.data)
            }
        })
    }, [])

    useEffect(() => {
        api.get(`app/emailaccounts`)
        .then((response) => {
            if (response.status === 200) {
                setEmailAccounts(response.data)
            }
        })
        .catch((error) => {
            alert(error)
        })
    },[])
    console.log(emailAccounts)

    const handleRecipientsChange = (event: React.ChangeEvent<HTMLInputElement>, recipient: string) => {
        if (event.target.checked) {
            setEmailContent((prevContent) => ({
                ...prevContent,
                recipients: [...prevContent.recipients, recipient]
            }))
        } else {
            setEmailContent((prevContent) => ({
                ...prevContent,
                recipients: prevContent.recipients.filter((item) => item !== recipient)
            }))
        }
    }

    const handleSendEmails = () => {
        api.post('/app/mail/send', emailContent).then(
            (response) => {
                if (response.status === 200) {
                    alert("email sending process has began")
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    const addEmailSender = (event: React.ChangeEvent<HTMLInputElement>, email: string) => {
        if (event.target.checked) {
            setEmailContent({...emailContent, sender_email: email})
        }
    }
    console.log(emailContent)
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
                            name="message"
                            defaultValue={emailContent.message}
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
                        {/* <ContactSelect /> */}
                        {/* NOT SUITABLE, BREAK THIS INTO COMPONENTS AND MOVE THE STATE TO REDUX FOR ACCESSIBILITY */}
                        <Container className="m-auto overflow-x-scroll">
                            <Tabs.Root defaultValue="contacts">
                                <Tabs.List>
                                    <Tabs.Trigger value="contacts">Contacts</Tabs.Trigger>
                                    <Tabs.Trigger value="groups">Groups</Tabs.Trigger>
                                </Tabs.List>
                                {/* display all contacts in this table here */}
                                <Tabs.Content value="contacts">
                                    <Table.Root>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeaderCell className="flex gap-2">Select</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>email</Table.ColumnHeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                contacts.map((contact) => (
                                                    <Table.Row key={contact.id}>
                                                        <Table.RowHeaderCell>
                                                            <input
                                                                type="checkbox"
                                                                checked = {emailContent.recipients.includes(contact.email)}
                                                                onChange={(event) => {
                                                                handleRecipientsChange(event, contact.email)
                                                                }}
                                                                className="cursor-pointer"/>
                                                        </Table.RowHeaderCell>
                                                        <Table.Cell>{contact.name}</Table.Cell>
                                                        <Table.Cell>{contact.email}</Table.Cell>
                                                    </Table.Row>
                                                ))
                                            }
                                        </Table.Body>
                                    </Table.Root>
                                </Tabs.Content>

                                <Tabs.Content value="groups">
                                    <Table.Root>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeaderCell>Select</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Number of contacts</Table.ColumnHeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                groups.map((group) => (
                                                    <Table.Row key={group.id}>
                                                        <Table.RowHeaderCell><Checkbox className="cursor-pointer"/></Table.RowHeaderCell>
                                                        <Table.Cell>{group.name}</Table.Cell>
                                                        <Table.Cell>{group.contacts.length}</Table.Cell>
                                                    </Table.Row>
                                                ))
                                            }
                                        </Table.Body>
                                    </Table.Root>
                                </Tabs.Content>
                            </Tabs.Root>
                        </Container>
                        {/* ENDS HERE */}
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
                                <p>{emailContent.message}</p>
                            </div>
                        </Container>
                        <Flex className="w-full mt-4 justify-center gap-2">
                            <Button variant="outline" className="px-4 cursor-pointer" onClick={() => setComposeStage("contactSelection")}>Back</Button>
                            {/* <Button className="cursor-pointer" onClick={() => setComposeStage("preview")}>Send emails</Button> */}
                            {/* <SendEmailPopup /> */}
                            {/* TODO: decompose this to it's own component */}
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button className="cursor-pointer">Send Emails</Button>
                                </Dialog.Trigger>

                                <Dialog.Portal>
                                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                                    <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                                        <Dialog.Title className="font-bold">Confirm sending emails to selected contacts</Dialog.Title>
                                        <Dialog.Description className="mb-4">Select an email address to use to send emails</Dialog.Description>
                                        {
                                            emailAccounts.map((emailAccount) => (
                                                <Flex className="gap-2 cursor-pointer mb-2 p-2">
                                                    <input type="checkbox" onChange={(event) => addEmailSender(event, emailAccount.email_address)} checked={emailContent.sender_email === emailAccount.email_address}/>
                                                    <p>{emailAccount.name} <span className="italic font-bold text-sm">({emailAccount.email_address})</span> </p>
                                                </Flex>
                                            ))
                                        }
                                        <Flex className="gap-2 mt-4 items-center justify-center">
                                            <Dialog.Close><button className="border-2 border-purple-500 px-4 py-1 rounded-md text-purple-600 font-bold cursor-pointer">Cancel</button></Dialog.Close>
                                            <Dialog.Close>
                                                <button
                                                    onClick={() => handleSendEmails()} 
                                                    className="border-none px-4 py-1 rounded-md text-white bg-purple-600 font-bold cursor-pointer">Confirm</button>
                                            </Dialog.Close>
                                        </Flex>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </Flex>
                    </>
                }
            </Container>
        </AppLayout>
    )
}