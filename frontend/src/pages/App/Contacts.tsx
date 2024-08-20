import { Avatar, Container, IconButton, Table, Tabs } from "@radix-ui/themes";
import AppLayout from "../../layouts/AppLayout";
import * as Dialog from "@radix-ui/react-dialog"
import { FaPlus } from "react-icons/fa";


function AddContactButton() {
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton className="rounded-full mt-4 cursor-pointer"><FaPlus /></IconButton>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Add a new contact</Dialog.Title>
                    <Dialog.Description>This is a dialog</Dialog.Description>
                    <p>Enter the email address</p>
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