import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "../layouts/main-layout";
import {AboutPage} from "../pages/AboutPage";
import {UsersListPage} from "../pages/UsersListPage";
import {CompaniesListPage} from "../pages/CompaniesListPage";
import {HomePage} from "../pages/HomePage";
import {UserProfilePage} from "../pages/UserProfilePage";
import {CompanyProfilePage} from "../pages/CompanyProfilePage ";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'users', element: <UsersListPage/>},
            {path: 'users/:id', element: <UserProfilePage/>},
            {path: 'companies', element: <CompaniesListPage/>},
            {path: 'companies/:id', element: <CompanyProfilePage/>}
        ]
    },
]);
