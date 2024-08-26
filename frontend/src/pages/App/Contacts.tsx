import { Avatar, Container, IconButton, Table, Tabs, Flex, TextArea } from "@radix-ui/themes";
import AppLayout from "../../layouts/AppLayout";
import * as Dialog from "@radix-ui/react-dialog"
import { FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { api } from "../../lib/requestHandler";
import { emailValid } from "../../utils/emailChecker";

type contactForm = {
    name: string,
    email: string
}
type groupForm = {
    name: string,
    description: string
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
function AddContactButton() {
    const [contactForm, setContactForm] = useState<contactForm>({
        name: "",
        email: ""
    })
    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setContactForm({...contactForm, [name]: value})
    }
    const [contactValid, setContactValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    useEffect(() => {
        if (contactForm.name.length > 3 && emailIsValid) {
            setContactValid(true)
        }
        else {
            setContactValid(false)
        }
    }, [contactForm, emailIsValid])
    const handleAddContact = () => {
        api.post('/app/contacts', contactForm)
        .then((response) => {
            if (response.status === 201) {
                // move state up to redux in order to reload new contact
                alert('contact created successfully')
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    alert('A contact with that email already exists')
                }
            }
            else {
                alert(error)
            }
        })
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
                    <Dialog.Description>Add a new contact to your contact list</Dialog.Description>
                    <form>
                        <Flex className="flex-col gap-2">
                            <label>Name</label>
                            <input placeholder="John Doe" name="name" onChange={(event) => handleFormChange(event)} className="border-2 h-[40px] px-2 rounded-sm focus:outline-purple-500"></input>
                        </Flex>
                        <Flex className="flex-col gap-2">
                            <label>Email address</label>
                            <input placeholder="johndoe@email.com" name="email" 
                                onChange={(event) => {
                                    setEmailIsValid(emailValid(event.target.value))
                                    handleFormChange(event)}} 
                                className="border-2 h-[40px] px-2 rounded-sm focus:outline-purple-500"></input>
                        </Flex>
                    </form>
                    <Dialog.Close asChild className="w-full mt-10">
                        {
                            contactValid ?
                            <button className="cursor-pointer bg-purple-600 text-white px-4 py-1 rounded-sm" onClick={() => handleAddContact()}>Save</button>
                            :
                            <button className="cursor-pointer bg-purple-100 text-gray-300 font-bold px-4 py-1 rounded-sm">Save</button>
                        }
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
    const handleAddNewGroup = () => {
        api.post('/app/contactgroups', groupForm)
        .then((response) => {
            if (response.status === 201) {
                alert("Group added successfully")
            }
    })
    .catch((error) => {
        if (error.response) {
            if (error.response.status === 400 ) {
                alert("Some data is missing")
            }
        }
    })
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
                        <button className="cursor-pointer bg-purple-600 text-white px-4 py-1 rounded-sm" onClick={() => handleAddNewGroup()}>Save</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

function AddContactToGroupButton({ groupName, groupId, contacts} : {groupName: string, groupId: number, contacts: contact[]}) {
    const [selectedContacts, setSelectedContacts] = useState<number[]>([])
    const handleContactSelection = (contactId: number, isChecked: boolean) => {
        const updatedSelectedContacts = [...selectedContacts]
        if (isChecked) {
            updatedSelectedContacts.push(contactId)
        }
        else {
            const index = updatedSelectedContacts.findIndex((id) => id ===contactId)
            if (index != -1) {
                updatedSelectedContacts.splice(index, 1)
            }
        }
        setSelectedContacts(updatedSelectedContacts)
    }
    const handleAddContactToGroup = () => {
        const payload = {
            "contacts" : selectedContacts
        }
        api.post(`/app/contactgroups/${groupId}/add`, payload)
        .then((response) => {
            if (response.status === 200) {
                alert("contacts added successfully to the group")
            }
        })
        .catch((error) => {
            if (error.response){
                if (error.response.status === 400) {
                    alert("Bad request")
                }
            }
            else {
                alert(error)
            }
        })
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {/* <IconButton className="rounded-full cursor-pointer"><FaPlus /></IconButton> */}
                <p className="text-purple-600 font-bold underline cursor-pointer">Add contact</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                    <Dialog.Title className="font-bold text-lg text-purple-700 mb-4">Add contacts to {groupName}</Dialog.Title>
                    <Dialog.Description>Select contacts to add to the group</Dialog.Description>
                    <div className="max-h-[70vh] overflow-y-scroll py-4 px-2">
                        {
                            contacts.map((contact) => (
                                <Flex className="gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        onChange={(event) => {
                                            handleContactSelection(contact.id, event.target.checked)
                                        }}></input>
                                    <p className="font-bold">{contact.name} <span className="font-sm italic font-normal">&#40;{contact.email}&#41;</span></p>
                                </Flex>
                            ))
                        }
                    </div>
                    <Dialog.Close asChild className="w-full mt-10">
                        <button
                            onClick={() => handleAddContactToGroup()}
                            className="cursor-pointer bg-purple-600 text-white px-4 py-1 rounded-sm">Add contacts</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

function ViewContactsPopup({groupName, groupId}: {groupName: string, groupId: number}) {
    const [contacts,setContacts] = useState<contact[]>([])
    useEffect(() => {
        api.get(`/app/contactgroups/${groupId}/contacts`)
        .then((response) => {
            if (response.status === 200) {
                setContacts(response.data.contacts)
            }
        })
    }, [])

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {/* <IconButton className="rounded-full cursor-pointer"><FaPlus /></IconButton> */}
                <p className="text-purple-600 font-bold underline cursor-pointer">View Contacts</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                    <Dialog.Title className="font-bold text-lg text-purple-700 mb-4">Contacts in {groupName}</Dialog.Title>
                    <div className="max-h-[70vh] overflow-y-scroll py-4 px-2">
                        {
                            contacts.length >= 1 && contacts.map((contact) => (
                                <p className="font-bold" key={contact.id}>
                                    {contact.name}
                                    <span className="text-sm italic font-normal"> ({contact.email})</span>
                                </p>
                            ))
                        }
                    </div>
                    <Dialog.Close asChild className="w-full mt-10">
                        <button className="cursor-pointer bg-purple-600 text-white px-4 py-1 rounded-sm">Close</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
export default function Contacts() {
    const [contacts, setContacts] = useState<contact[]>([])
    const [groups, setGroups] = useState<group[]>([])
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
                            {
                                contacts.map((contact) => (
                                    <Table.Row key={contact.id}>
                                        <Table.RowHeaderCell><Avatar fallback={contact.name[0]} className="rounded-full"/></Table.RowHeaderCell>
                                        <Table.Cell>{contact.name}</Table.Cell>
                                        <Table.Cell>{contact.email}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
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
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        </Table.Header>

                        <Table.Body>
                            {
                                groups.map((group) => (
                                    <Table.Row key={group.id}>
                                        <Table.RowHeaderCell><Avatar fallback={group.name[0]} className="rounded-full"/></Table.RowHeaderCell>
                                        <Table.Cell>{group.name}</Table.Cell>
                                        <Table.Cell>{group.contacts.length}</Table.Cell>
                                        <Table.Cell><AddContactToGroupButton groupName={group.name} contacts={contacts} groupId={group.id}/></Table.Cell>
                                        <Table.Cell><ViewContactsPopup groupName={group.name} groupId={group.id}/></Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table.Root>
                </Tabs.Content>
            </Tabs.Root>
            </Container>
        </AppLayout>
    )
}