import { NavLink, Outlet } from "react-router-dom";

import Logo from "../../../shared/components/Logo";

const Layout = () => {
  return (
    <div>
      <header className="px-8 py-9">
        <NavLink className="text-text-500" title="Home" to="/">
          <Logo />
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
