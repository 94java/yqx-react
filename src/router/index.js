import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Popular from "../pages/Popular";
import Profile from "../pages/Profile";
import QuestionBank from "../pages/QuestionBank";
import Recommend from "../pages/Home/Recommend";
import Note from "../pages/Home/Note";
import Video from "../pages/Home/Video";
import Search from "../pages/Home/Search";
import QuestionDetail from "../pages/QuestionBank/Detail";
import Details from "../pages/Home/Note/Details";
import VideoDetails from "../pages/Home/Video/Details";
import UserDetails from "../pages/Profile/Home";
import Login from "../pages/Login";
import Exercise from "../pages/QuestionBank/Exercise";
import Add from "../pages/Popular/Add";
import Follow from "../pages/Profile/Follow";
import Fans from "../pages/Profile/Fans";
import UpdateInfo from "../pages/Profile/UpdateInfo";
import PopularDetails from "../pages/Popular/Details";
import Visitor from "../pages/Profile/Visitor";
import Wrong from "../pages/QuestionBank/Wrong";
import Likes from "../pages/Profile/Likes";
import History from "../pages/Profile/History";
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
        path: "popular",
        element: <Popular />,
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
  {
    path: "/question-bank/wrong",
    element: <Wrong />,
  },
  {
    path: "/popular/details",
    element: <PopularDetails />,
  },
  {
    path: "/user/home",
    element: <UserDetails />,
  },
  {
    path: "/user/follow",
    element: <Follow />,
  },
  {
    path: "/user/fans",
    element: <Fans />,
  },
  {
    path: "/user/visitor",
    element: <Visitor />,
  },
  {
    path: "/user/likes",
    element: <Likes />,
  },
  {
    path: "/user/history",
    element: <History />,
  },
  {
    path: "/user/update",
    element: <UpdateInfo />,
  },
  { path: "/popular/add", element: <Add /> },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
];

export default routes;
