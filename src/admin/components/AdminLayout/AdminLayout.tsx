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
      <header className="flex items-center justify-between border-b border-solid border-neutral-200 px-5 py-4">
        <h1 className="font-sans text-2xl font-normal">Admin</h1>
        <button className="btn" onClick={onSignOut}>
          Sign Out
        </button>
      </header>
      <main className="flex grow justify-center px-10">
        <div className="w-full max-w-7xl py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
