import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import AppRouter from "./app/router";
import LoadingScreen from "./shared/components/LoadingScreen";
import NoMatchPage from "./shared/pages/noMatch";

const AdminRouter = lazy(() => import("./admin/router"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/*" element={<AppRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
