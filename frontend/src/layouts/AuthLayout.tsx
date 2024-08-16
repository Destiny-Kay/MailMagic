import { Container } from "@radix-ui/themes";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: ReactNode}) {
    return(
        <Container className="mt-10 px-4 overflow-x-hidden">
            <Link to={"/"} className="text-2xl font-bold">Mail <span className="text-purple-700">Magic</span></Link>
            {children}
        </Container>
    )
}