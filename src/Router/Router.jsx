import { createBrowserRouter } from "react-router";
import Home from "../Home Page/Home";
import Error from "../Component/404/Error";
import Register from "../Component/User/Register";
import SignIn from "../Component/User/SignIn";
import Assignment from "../Component/Assignment/Assignment";
import CreatAssign from "../Component/Create Assignment/CreatAssign";
import PrivetRout from "../PrivetRout/PrivetRout";
import AttemptAssign from "../Component/Attempt Assignment/AttemptAssign";
import Details from "../Component/Assignment Details/Details";
import UpdateAssign from "../Component/Assignment/UpdateAssign";
import PAssign from "../Component/Pending Assignment/PAssign";
import Main from "../Main/Main";
import About from "../Component/About/About";
import UserProfile from "../Component/UserProfile/UserProfile";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Main,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/assignment',
                Component: Assignment,
                // loader: () => fetch('https://group-study-platform-backend.vercel.app/assignment')
                loader: () => fetch('http://localhost:3000/assignment')
            },
            {
                path: '/createassignment',
                element: <PrivetRout>
                    <CreatAssign></CreatAssign>
                </PrivetRout>
            },
            {
                path: '/details/:id',
                element: <PrivetRout>
                    <Details></Details>
                </PrivetRout>,
                // loader: ({ params }) => fetch(`https://group-study-platform-backend.vercel.app/assignment/${params.id}`,{
                //     credentials: 'include'
                // }),
                loader: ({ params }) => fetch(`http://localhost:3000/assignment/${params.id}`,{
                    credentials: 'include'
                }),
            },
            {
                path: '/update/:id',
                element: <PrivetRout>
                    <UpdateAssign></UpdateAssign>
                </PrivetRout>,
                // loader: ({ params }) => fetch(`https://group-study-platform-backend.vercel.app/assignment/${params.id}`,{
                //     credentials: 'include'
                // }),
                loader: ({ params }) => fetch(`http://localhost:3000/assignment/${params.id}`,{
                    credentials: 'include'
                }),
            },
            {
                path: '/attemptassignment/:email',
                element: <PrivetRout><AttemptAssign></AttemptAssign></PrivetRout>,
                // loader: ({ params }) => fetch(`https://group-study-platform-backend.vercel.app/takeassignment/user/${params.email}`, {
                //     credentials: 'include'
                // })
                loader: ({ params }) => fetch(`http://localhost:3000/takeassignment/user/${params.email}`, {
                    credentials: 'include'
                })
            },
            {
                path: '/pending/:email',
                element: <PrivetRout>
                    <PAssign></PAssign>
                </PrivetRout>,
                // loader: ({ params }) => fetch(`https://group-study-platform-backend.vercel.app/takeassignment?email=${params.email}`, {
                //     credentials: 'include'
                // })
                loader: ({ params }) => fetch(`http://localhost:3000/takeassignment?email=${params.email}`, {
                    credentials: 'include'
                })
            },
        {
                path: '/myprofile',
                element: <PrivetRout>
                    <UserProfile></UserProfile>
                </PrivetRout>
            },
            {
                path: '/about',
                Component: About
            },
           
        ]
    },
    {
        path: '/signin',
        Component: SignIn,
    },
    {
        path: '/register',
        Component: Register,
    },

])