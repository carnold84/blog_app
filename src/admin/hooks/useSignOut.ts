import { useContext } from "react";

import { AdminContext } from "../store/AdminProvider";

const useSignOut = () => {
  const { signOut } = useContext(AdminContext);

  return signOut;
};

export default useSignOut;
