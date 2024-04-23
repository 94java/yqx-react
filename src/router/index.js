import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import News from "../pages/News";
import Profile from "../pages/Profile";
import QuestionBank from "../pages/QuestionBank";
import Recommend from "../pages/Home/Recommend";
import Note from "../pages/Home/Note";
import Video from "../pages/Home/Video";
import Resource from "../pages/Home/Resource";

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'home',
                element: <Home/>,
                children: [
                    {
                        path: 'recommend',
                        element: <Recommend/>
                    },
                    {
                        path: 'note',
                        element: <Note/>
                    },
                    {
                        path: 'video',
                        element: <Video/>
                    },
                    {
                        path: 'Resource',
                        element: <Resource/>
                    },
                    {
                        path: '',
                        element: <Navigate to="/home/recommend"/>
                    }
                ]
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