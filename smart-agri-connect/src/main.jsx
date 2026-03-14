import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from './components/Body.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import MarketPlace from './pages/MarketPlace.jsx';
import AgriBlogs from './pages/AgriBlogs.jsx';
import DashBoard from './pages/DashBoard.jsx';
import './index.css'
import SignUp from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

const root = createRoot(document.getElementById('root'));

const appRouter = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Body />
    },
    {
      path: "home",
      element: <Home />
    },
    {
      path: "about",
      element: <About />
    },
    {
      path: "marketplace",
      element: <MarketPlace />
    },
    {
      path: "agriblogs",
      element: <AgriBlogs />
    },
    {
      path: "dashboard",
      element: <DashBoard />
    },
    {
      path: "login",
      element: <Login/>
    },
    {
      path: "signup",
      element: <SignUp />
    }

  ]
}])

root.render(<RouterProvider router={appRouter} />)
