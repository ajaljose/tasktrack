import { createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Landing/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])

export default router;