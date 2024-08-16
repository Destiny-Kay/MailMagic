import WebNav from "../components/WebNav";
import { ReactNode } from "react";
import Footer from "../components/Footer";

export default function WebLayout({ children }: {children: ReactNode}) {
    return(
        <div>
            <WebNav />
            {children}
            <Footer />
        </div>
    )
}