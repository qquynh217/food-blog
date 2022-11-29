import ContactPage from "../pages/Contact/ContactPage";
import HomePage from "../pages/Home/HomePage";
import BlogPage from "../pages/Blog/BlogPage";
import { routes } from "./routes";
import AboutPage from "../pages/About/AboutPage";
import Login from "../pages/Auth/Login";
import { Fragment } from "react";
import SignUp from "../pages/Auth/SignUp";
import Profile from "../pages/Profile/Profile";
import Setting from "../pages/Setting/Setting";
import Post from "../pages/Post/Post";
import NewPost from "../pages/Post/NewPost";

export const publicRoutes = [
    { path: routes.home, component: HomePage },
    { path: routes.contact, component: ContactPage },
    { path: routes.blog, component: BlogPage },
    { path: routes.about, component: AboutPage },
    { path: routes.login, component: Login, layout: Fragment },
    { path: routes.signup, component: SignUp, layout: Fragment },
    { path: routes.profile, component: Profile },
    { path: routes.setting, component: Setting },
    { path: routes.post, component: Post },
    { path: routes.newpost, component: NewPost, layout: Fragment },
    { path: routes.editpost, component: NewPost, layout: Fragment },
]
export const privateRoutes = [
]