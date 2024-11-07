import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "../layouts/main-layout";
import {AboutPage} from "../pages/AboutPage";
import {UsersListPage} from "../pages/UsersListPage";
import {CompaniesListPage} from "../pages/CompaniesListPage";
import {HomePage} from "../pages/HomePage";
import {PrivateRoute} from "./PrivateRoute";
import {RegistrationPage} from "../pages/RegistrationPage";
import {LoginPage} from "../pages/LoginPage";
import {UserDetailsPage} from "../pages/UserDetailsPage";
import {UserProfilePage} from "../pages/UserProfilePage";
import {CompanyDetailsPage} from "../pages/CompanyDetailsPage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'register', element: <RegistrationPage/>},
            {
                path: 'users',
                element: <PrivateRoute/>,
                children: [
                    {index: true, element: <UsersListPage/>},
                    {path: ':id', element: <UserDetailsPage/>},
                ],
            },
            {
                path: 'auth',
                element: <PrivateRoute/>,
                children: [
                    {path: 'me', element: <UserProfilePage/>},
                ],
            },
            {
                path: 'companies',
                element: <PrivateRoute/>,
                children: [
                    {index: true, element: <CompaniesListPage/>},
                    {path: ':id', element: <CompanyDetailsPage/>},
                ],
            },
        ],
    },
]);
