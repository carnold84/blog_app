import { Route, Routes } from "react-router-dom";

import NoMatchPage from "../../shared/pages/noMatch";
import Layout from "../components/Layout";
import ArticlePage from "../pages/article";
import HomePage from "../pages/home";
import AppProvider from "../store";

const AppRouter = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default AppRouter;
