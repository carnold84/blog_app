import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header className="p-3 text-2xl font-semibold">
        <h1>Less Sleep</h1>
      </header>
      <main className="p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
