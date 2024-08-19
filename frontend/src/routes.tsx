import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
    }
])