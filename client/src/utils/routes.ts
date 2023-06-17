import LoginPage from "src/pages/loginPage/LoginPage";
import MapPage from "src/pages/mapPage/MapPage";

import {
    Login_Route, Map_Route
} from "./constants";

export const publicRoutes = [
    {
        path: Login_Route,
        Component: LoginPage
    },
];
export const authRoutes = [
    {
        path: Map_Route,
        Component: MapPage
    },
];
