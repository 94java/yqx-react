import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import News from "../pages/News";
import Profile from "../pages/Profile";
import QuestionBank from "../pages/QuestionBank";

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'question-bank',
                element: <QuestionBank/>
            },
            {
                path: 'news',
                element: <News/>
            },
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: '/',
                element: <Navigate to='/home'/>
            }
        ]
    }
]

export default routes