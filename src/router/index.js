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
import Search from "../pages/Home/Search";
import QuestionDetail from "../pages/QuestionBank/Detail";
import Details from "../pages/Home/Note/Details";
import VideoDetails from "../pages/Home/Video/Details";
import Login from "../pages/Login";
import Exercise from "../pages/QuestionBank/Exercise";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "recommend",
            element: <Recommend />,
          },
          {
            path: "note",
            element: <Note />,
          },
          {
            path: "video",
            element: <Video />,
          },
          {
            path: "resource",
            element: <Resource />,
          },
          {
            path: "",
            element: <Navigate to="/home/recommend" />,
          },
        ],
      },
      {
        path: "question-bank",
        element: <QuestionBank />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/note/details",
    element: <Details />,
  },
  {
    path: "/video/details",
    element: <VideoDetails />,
  },
  {
    path: "/question-bank/detail",
    element: <QuestionDetail />,
  },
  {
    path: "/question-bank/exercise",
    element: <Exercise />,
  },
];

export default routes