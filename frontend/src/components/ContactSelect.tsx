import { Checkbox, Container, Table, Tabs } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import { api } from "../lib/requestHandler"

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

export default function ContactSelect() {
    const [selectedContacts, setSelectedContacts] = useState<contact[] | group[]>([])
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
                                        <Table.RowHeaderCell><Checkbox className="cursor-pointer"/></Table.RowHeaderCell>
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
                                    <Table.Row>
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
    )
}