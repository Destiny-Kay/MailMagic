import { BsEye, BsEyeSlash } from "react-icons/bs";
import AppLayout from "../../layouts/AppLayout";
import { Button, Container, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog"
import { api } from "../../lib/requestHandler";

type passwordType = "password" | "text"
type emailAccountForm = {
    name: string,
    email: string,
    password: string
}
type emailAccount = {
    id: number,
    email_address: string,
    name: string,
    password:string
}

function AddEmailAccountDialog() {
    const [passwordType, setPasswordType] = useState<passwordType>("password")
    const [emailAccountForm, setEmailAccountForm] = useState<emailAccountForm>({
        name: '',
        email: '',
        password: ''
    })
    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setEmailAccountForm({...emailAccountForm, [name]: value})
    }
    const submitEmailAccount = () => {
        api.post('/app/emailaccounts', emailAccountForm)
        .then((response) => {
            if (response.status === 201) {
                alert("The email account has been added successfully")
            }
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    alert("The data you provided is not accurate")
                }
            }
            else {
                alert(error)
            }
        })
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="cursor-pointer">Add an email account</Button>
            </Dialog.Trigger>

            <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/>
                <Dialog.Content className="w-5/6 md:w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                    <Dialog.Title className="font-bold text-lg mb-4">Add a new email account</Dialog.Title>
                    <Dialog.Description>Setup the email account</Dialog.Description>

                        <form>
                            <Flex className="flex-col">
                                <label>Label</label>
                                <input
                                    name="name"
                                    placeholder="My personal email"
                                    onChange={(event) => handleFormChange(event)}
                                    className="border-2 rounded-lg px-2 h-[40px] focus:outline-purple-600">
                                </input>
                            </Flex>
                            <Flex className="flex-col">
                                <label>Email address</label>
                                <input
                                    name="email"
                                    placeholder="johndoe@email.com"
                                    onChange={(event) => handleFormChange(event)}
                                    className="border-2 rounded-lg px-2 h-[40px] focus:outline-purple-600">
                                </input>
                            </Flex>
                            <Flex className="flex-col">
                                <label>Email password</label>
                                <div className="flex items-center px-2 border-2 rounded-lg">
                                    <input
                                        type={passwordType}
                                        name="password"
                                        onChange={(event) => handleFormChange(event)}
                                        className="w-full  h-[40px] focus:outline-none">
                                    </input>
                                    {
                                        passwordType === "password" ?
                                        <BsEyeSlash onClick={() => setPasswordType("text")} className="cursor-pointer" />
                                        :
                                        <BsEye onClick={() => setPasswordType("password")} className="cursor-pointer"/>
                                    }
                                </div>
                            </Flex>
                        </form>
                    <Dialog.Close className="bg-purple-700 text-white p-2 rounded-md mt-8" onClick={() => submitEmailAccount()}>
                        Add account
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
export default function Settings() {
    const [emailAccounts, setEmailAccounts] = useState<emailAccount[]>([])
    useEffect(() => {
        api.get("/app/emailaccounts")
        .then((response) => {
            if (response.status === 200) {
                setEmailAccounts(response.data)
            }
        })
        .catch((error) => {
            alert(error)
        })
    }, [])
    const handleDeleteAccount = (emailAccountId: number) => {
        api.delete(`/app/emailaccounts/${emailAccountId}`)
        .then((response) => {
            if (response.status === 204) {
                alert("The email account has been deleted successfully")
            }
        })
        .catch((error) => {
            alert(error)
        })
    }
    return(
        <AppLayout>
            <Container className="md:mt-32 md:w-2/3 mt-20 mx-6 md:m-auto">
                <p className="font-bold">Your email accounts</p>
                <div className="border-[1px] shadow-xl p-2 rounded-lg my-4">
                    {
                        emailAccounts.map((account) => (
                            <Flex className="flex-col gap-2 my-2 border-b-2 py-2">
                                <p className="font-bold text-lg">{account.name}</p>
                                <p>{account.email_address}</p>
                                {/* <p>Edit</p> */}
                                <button
                                    onClick={() => handleDeleteAccount(account.id)}
                                    className="max-w-[200px] cursor-pointer border-[1px] rounded-md text-red-400 border-red-400 hover:bg-red-600 hover:text-white py-1">Delete</button>
                            </Flex>
                        ))
                    }
                </div>
                <AddEmailAccountDialog />
            </Container>
        </AppLayout>
    )
}
