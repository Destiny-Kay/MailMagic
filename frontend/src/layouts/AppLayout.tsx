import { ReactNode, useEffect } from "react";
import AppSidebar from "../components/AppSidebar";
import TopNav from "../components/TopNav";
import { useLocation } from "react-router-dom";

export default function AppLayout({ children }: {children: ReactNode}) {
    const location = useLocation()
    useEffect(
        () => {
            window.scrollTo(0, 0)
        }, [location])
    return (
        <div>
            <TopNav />
            <AppSidebar />
            {children}
        </div>
    )
}