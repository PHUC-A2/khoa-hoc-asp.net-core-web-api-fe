import { createBrowserRouter, RouterProvider } from 'react-router';
import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/client/home/HomePage";
import NotFoundPage from "../pages/error/NotFoundPage";
import AdminLayout from '../layouts/AdminLayout';
import AdminPage from '../pages/admin/AdminPage';
import ExamStructurePage from '../pages/admin/exam-structure/ExamStructurePage';
interface AppRouterProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const AppRouter = ({ theme, toggleTheme }: AppRouterProps) => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <ClientLayout theme={theme} toggleTheme={toggleTheme} />,
            children: [
                { index: true, element: <HomePage theme={theme} /> },
                { path: "/pitch", element: "" },
                { path: "/pitch/:id", element: "" },
                { path: "/about", element: "" },
            ]
        },
        {
            path: "/admin",
            element: <AdminLayout theme={theme} toggleTheme={toggleTheme} />,
            children: [
                { index: true, element: <AdminPage /> },
                { path: "/admin/cau-truc-de", element: <ExamStructurePage /> },
            ]
        },
        { path: "/login", element: "" },
        { path: "/register", element: "" },
        { path: "*", element: <NotFoundPage /> },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
