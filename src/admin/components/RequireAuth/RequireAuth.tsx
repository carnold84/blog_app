import { Navigate, useLocation } from "react-router-dom";

import useUser from "../../hooks/useUser";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
