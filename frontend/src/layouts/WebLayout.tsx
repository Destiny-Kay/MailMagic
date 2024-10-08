import WebNav from "../components/WebNav";
import { ReactNode, useEffect } from "react";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

export default function WebLayout({ children }: {children: ReactNode}) {
    const location = useLocation()
    useEffect(
        () => {
            window.scrollTo(0, 0)
        }, [location])
    return(
        <div>
            <WebNav />
            {children}
            <Footer />
        </div>
    )
}
