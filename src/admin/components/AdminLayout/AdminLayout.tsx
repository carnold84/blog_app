import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useSignOut from "../../hooks/useSignOut";
import useUser from "../../hooks/useUser";

const AdminLayout = () => {
  const { user } = useUser();
  const signOut = useSignOut();
  const location = useLocation();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!user) {
    return <Navigate to="/admin/sign-in" state={{ from: location }} replace />;
  }

  const onSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
  };

  if (isSigningOut) {
    return <p>Signing out...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-solid border-slate-200 p-3">
        <h1 className="font-sans text-lg">Admin</h1>
        <button className="btn text-sm" onClick={onSignOut}>
          Sign Out
        </button>
      </header>
      <main className="flex grow justify-center px-5">
        <div className="w-full max-w-7xl py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
