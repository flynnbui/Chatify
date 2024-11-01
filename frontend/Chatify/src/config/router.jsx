import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/loginPage";
import RegisterPage from "../pages/register/registerPage";
import HomePage from "../pages/home/homePage";
import NewChat from "../components/NewChat";

// const ProtectedRouteAuth = ({ children }) => {
//   if (!user) {
//     message.error("You need to login first!!");
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

export const router = createBrowserRouter([
  {
    path: "/login",
    element : <LoginPage/>,
  },
  {
    path: "/register",
    element : <RegisterPage/>,
  },
  {
    path: "/home",
    element: <HomePage/>,
    children: [
      {
        path: "/home/newChat",
        element: <NewChat/>
      }
    ]
  }
]);

