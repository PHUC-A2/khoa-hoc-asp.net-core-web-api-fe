import { createBrowserRouter, RouterProvider } from 'react-router';
import ClientLayout from "../layouts/ClientLayout";
import NotFoundPage from "../pages/error/NotFoundPage";
import AdminLayout from '../layouts/AdminLayout';
import AdminPage from '../pages/admin/AdminPage';
import ExamStructurePage from '../pages/client/exam-structure/ExamStructurePage';
import ExamStructurePages from '../pages/admin/exam-structure/ExamStructurePage';
import AboutPage from '../pages/client/about/AboutPage';
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
                { index: true, element: <ExamStructurePage theme={theme} /> },
                { path: "/pitch", element: "" },
                { path: "/pitch/:id", element: "" },
                { path: "/about", element: <AboutPage theme={theme} /> },
            ]
        },
        {
            path: "/admin",
            element: <AdminLayout theme={theme} toggleTheme={toggleTheme} />,
            children: [
                { index: true, element: <AdminPage /> },
                { path: "/admin/cau-truc-de", element: <ExamStructurePages /> },
            ]
        },
        { path: "/login", element: "" },
        { path: "/register", element: "" },
        { path: "*", element: <NotFoundPage /> },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
