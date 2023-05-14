import { Route, Routes } from "react-router-dom";

import NoMatchPage from "../../shared/pages/noMatch";
import AdminLayout from "../components/AdminLayout";
import RequireAuth from "../components/RequireAuth";
import DashboardPage from "../pages/dashboard";
import EditArticlePage from "../pages/editArticle";
import SignInPage from "../pages/signIn";
import AdminProvider from "../store";

const AdminRouter = () => {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route
            index
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="article/:id"
            element={
              <RequireAuth>
                <EditArticlePage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<NoMatchPage />} />
        <Route path={"/sign-in"} element={<SignInPage />} />
      </Routes>
    </AdminProvider>
  );
};

export default AdminRouter;
