import { Avatar, Button, Container, IconButton, Table, Tabs, Flex, TextArea } from "@radix-ui/themes";
import AppLayout from "../../layouts/AppLayout";
import * as Dialog from "@radix-ui/react-dialog"
import { FaPlus } from "react-icons/fa";
import { useState } from "react";


type contactForm = {
    name: string,
    email: string
}
type groupForm = {
    name: string,
    description: string
}

function AddContactButton() {
    const [contactForm, setContactForm] = useState<contactForm>({
        name: "",
        email: ""
    })
    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setContactForm({...contactForm, [name]: value})
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton className="rounded-full mt-4 cursor-pointer"><FaPlus /></IconButton>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                    <Dialog.Title className="font-bold text-lg mb-4">Add a new contact</Dialog.Title>
                    
                    <form>
                        <Flex className="flex-col gap-2">
                            <label>Name</label>
                            <input placeholder="John Doe" name="name" onChange={(event) => handleFormChange(event)} className="border-2 h-[40px] px-2 rounded-sm focus:outline-purple-500"></input>
                        </Flex>
                        <Flex className="flex-col gap-2">
                            <label>Email address</label>
                            <input placeholder="johndoe@email.com" name="email" onChange={(event) => handleFormChange(event)} className="border-2 h-[40px] px-2 rounded-sm focus:outline-purple-500"></input>
                        </Flex>
                    </form>
                    <Dialog.Close asChild className="w-full mt-10">
                        <button className="cursor-pointer bg-purple-600 text-white px-4 py-1 rounded-sm">Save</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

function AddGroupButton() {
    const [groupForm, setGroupForm] = useState<groupForm>({
        name: "",
        description: ""
    })
    const handleGroupFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setGroupForm({...groupForm, [name]: value})
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton className="rounded-full mt-4 cursor-pointer"><FaPlus /></IconButton>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                    <Dialog.Title className="font-bold text-lg mb-4">Add a new Group</Dialog.Title>
                    <form>
                        <Flex className="flex-col gap-2">
                            <label>Name</label>
                            <input placeholder="Class group" name="name" onChange={(event) => handleGroupFormChange(event)} className="border-2 h-[40px] px-2 rounded-sm focus:outline-purple-500"></input>
                        </Flex>
                        <Flex className="flex-col gap-2">
                            <label>Group Description</label>
                            <TextArea placeholder="Add a group description" name="description" onChange={(event) => handleGroupFormChange(event)} className="px-2 rounded-md min-h-[100px]"></TextArea>
                        </Flex>
                    </form>
                    <Dialog.Close asChild className="w-full mt-10">
                        <button className="cursor-pointer bg-purple-600 text-white px-4 py-1 rounded-sm">Save</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
export default function Contacts() {
    return(
        <AppLayout>
            <Container className="md:mt-32 md:w-2/3 mt-20 mx-6 md:m-auto">
            <Tabs.Root defaultValue="contacts">
                <Tabs.List>
                    <Tabs.Trigger value="contacts" className="cursor-pointer">Contacts</Tabs.Trigger>
                    <Tabs.Trigger value="groups" className="cursor-pointer">Groups</Tabs.Trigger>
                </Tabs.List>
                
                <Tabs.Content value="contacts">
                    <AddContactButton />
                    <Table.Root>
                        <Table.Header>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.RowHeaderCell><Avatar fallback="A" className="rounded-full"/></Table.RowHeaderCell>
                                <Table.Cell>John Doe</Table.Cell>
                                <Table.Cell>johndoe@email.com</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.RowHeaderCell><Avatar fallback="B" className="rounded-full"/></Table.RowHeaderCell>
                                <Table.Cell>John Doe</Table.Cell>
                                <Table.Cell>johndoe@email.com</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                </Tabs.Content>

                <Tabs.Content value="groups">
                    <AddGroupButton />
                    <Table.Root>
                        <Table.Header>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Contacts</Table.ColumnHeaderCell>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.RowHeaderCell><Avatar fallback="A" className="rounded-full"/></Table.RowHeaderCell>
                                <Table.Cell>School members</Table.Cell>
                                <Table.Cell>23</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                </Tabs.Content>
            </Tabs.Root>
            </Container>
        </AppLayout>
    )
}