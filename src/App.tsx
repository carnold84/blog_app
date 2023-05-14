import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import AppRouter from "./app/router";
import LoadingScreen from "./shared/component/LoadingScreen";
import NoMatchPage from "./shared/pages/noMatch";
import AppProvider from "./shared/store";

const AdminRouter = lazy(() => import("./admin/router"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppProvider>
        <Routes>
          <Route path="/*" element={<AppRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </AppProvider>
    </Suspense>
  );
}

export default App;
