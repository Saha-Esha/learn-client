import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Component/login/Login";
import HomeUI from "../Component/Home/Home/HomeUI";
import Chat from "../Component/Home/Chat/Chat";
import EnterUser from "../Component/login/EnterUser";
import LessonQuiz from "../Component/Home/LessonQuiz/LessonQuiz";
import AddQuiz from "../Component/Home/Teacher/AddQiuz/AddQuiz";
import Profile from "../Component/Home/Profile/Profile";
import Payment from "../Component/Home/Payment/Payment";
import AddLesson from "../Component/Home/Teacher/AddLesson/AddLesson";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <HomeUI />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/enterUser",
        element: <EnterUser />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/payment/:lessonId",
        element: <Payment />,
      },
      {
        path: "/lesson/:lessonId",
        element: <LessonQuiz />,
      },
      {
        path: "/lesson/add",
        element: <AddLesson />,
      },

      {
        path: "/lesson/:lessonId/add-quiz",
        element: <AddQuiz />,
      },
    ],
  },
]);
