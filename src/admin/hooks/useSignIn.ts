import { useContext } from "react";

import { AdminContext } from "../store/AdminProvider";

const useSignIn = () => {
  const { signIn } = useContext(AdminContext);

  return signIn;
};

export default useSignIn;
