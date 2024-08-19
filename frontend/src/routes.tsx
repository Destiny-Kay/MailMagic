import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/App/Dasboard";
import Compose from "./pages/App/Compose";
import Settings from "./pages/App/Settings";
import Contacts from "./pages/App/Contacts";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/auth/login",
        element: <Login />
    },
    {
        path: '/auth/signup',
        element: <Signup />
    },
    {
        path: '/app/dashboard',
        element: <Dashboard />
    },
    {
        path: '/app/compose',
        element: <Compose />
    },
    {
        path: '/app/contacts',
        element: <Contacts />
    },
    {
        path: '/app/settings',
        element: <Settings />
    }
])