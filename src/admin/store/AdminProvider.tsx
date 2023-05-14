import { ReactNode, createContext, useEffect, useState } from "react";

import LoadingScreen from "../../shared/component/LoadingScreen";
import { authApi } from "../api";
import { AuthResponse, SignIn } from "../api/auth";
import { User } from "../types";

interface Props {
  children: ReactNode;
}

interface Context {
  status: "error" | "loading" | "success";
  signIn: (payload: SignIn) => Promise<AuthResponse> | null;
  signOut: () => Promise<AuthResponse> | null;
  user: User | undefined;
}

const initialState: Context = {
  status: "loading",
  signIn: () => null,
  signOut: () => null,
  user: undefined,
};

export const AdminContext = createContext<Context>(initialState);

const AdminProvider = ({ children }: Props) => {
  const [state, setState] = useState<Context>(initialState);

  const signIn = async ({ email, password }: SignIn): Promise<AuthResponse> => {
    const response = await authApi.signIn({ email, password });

    if (response.status === "success") {
      setState((prev) => {
        return {
          ...prev,
          status: "success",
          user: response.user,
        };
      });

      return {
        status: "success",
        user: response.user,
      };
    } else {
      setState((prev) => {
        return {
          ...prev,
          status: "error",
          user: undefined,
        };
      });

      return {
        message: response.message,
        status: "error",
      };
    }
  };

  const signOut = async (): Promise<AuthResponse> => {
    const response = await authApi.signOut();

    if (response.status === "success") {
      setState((prev) => {
        return {
          ...prev,
          status: "success",
          user: undefined,
        };
      });

      return {
        status: "success",
      };
    } else {
      setState((prev) => {
        return {
          ...prev,
          status: "error",
          user: undefined,
        };
      });

      return {
        message: response.message,
        status: "error",
      };
    }
  };

  const getUser = async () => {
    const response = await authApi.getUser();

    if (response.status === "success") {
      setState((prev) => {
        return {
          ...prev,
          status: "success",
          user: response.user,
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          status: "error",
          user: undefined,
        };
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (state.status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <AdminContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
