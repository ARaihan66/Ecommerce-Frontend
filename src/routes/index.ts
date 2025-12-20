import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/log-in",
        Component: Login,
      },
      {
<<<<<<< HEAD
=======
        path: "/sign-up",
        Component: SignUp,
      },
      {
>>>>>>> a6de92d98bd19a84a281a41b6b86fc1c55737db2
        path: "/forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
]);

export default router;
