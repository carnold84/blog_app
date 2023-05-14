import { useContext } from "react";

import { AdminContext } from "../store/AdminProvider";

const useUser = () => {
  const { status, user } = useContext(AdminContext);

  return {
    isError: status === "error",
    isLoading: status === "loading",
    user,
  };
};

export default useUser;
