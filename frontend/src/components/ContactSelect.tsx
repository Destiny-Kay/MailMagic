import { Checkbox, Container, Table, Tabs } from "@radix-ui/themes"
import { useState } from "react"

export default function ContactSelect() {
    const [allContactsSelected, setAllContactsSelected] = useState<boolean>(false)
    // TODO: Change everything here to make api call to the backend
    // Move the selected contact state to redux store to ensure 
    console.log(allContactsSelected)
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
                                <Table.ColumnHeaderCell className="flex gap-2"><Checkbox className="cursor-pointer" value={"all"} onCheckedChange={() => setAllContactsSelected(true)}/><p>All</p></Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>email</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {/* Add contacts here in rows */}
                            <Table.Row>
                                <Table.RowHeaderCell><Checkbox className="cursor-pointer"/></Table.RowHeaderCell>
                                <Table.Cell>John Doe</Table.Cell>
                                <Table.Cell>johndoe@email.com</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.RowHeaderCell><Checkbox className="cursor-pointer"/></Table.RowHeaderCell>
                                <Table.Cell>John Doe</Table.Cell>
                                <Table.Cell>johndoe@email.com</Table.Cell>
                            </Table.Row>
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
                            <Table.Row>
                                <Table.RowHeaderCell><Checkbox className="cursor-pointer"/></Table.RowHeaderCell>
                                <Table.Cell>Class Assignment</Table.Cell>
                                <Table.Cell>24</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                </Tabs.Content>
            </Tabs.Root>
        </Container>
    )
}