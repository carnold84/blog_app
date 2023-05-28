import { ReactNode, createContext, useEffect, useState } from "react";

import api from "../../shared/api";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { Article } from "../../shared/types";
import { articlesApi, authApi } from "../api";
import { ArticleResponse } from "../api/articles";
import { AuthResponse, SignIn } from "../api/auth";
import { User } from "../types";

interface Props {
  children: ReactNode;
}

interface Context {
  articles: Article[];
  status: "error" | "loading" | "success";
  signIn: (payload: SignIn) => Promise<AuthResponse> | null;
  signOut: () => Promise<AuthResponse> | null;
  updateArticle: (payload: Article) => Promise<ArticleResponse> | null;
  user: User | undefined;
}

const initialState: Context = {
  articles: [],
  status: "loading",
  signIn: () => null,
  signOut: () => null,
  updateArticle: () => null,
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

  const updateArticle = async (article: Article): Promise<ArticleResponse> => {
    const response = await articlesApi.updateArticle(article);

    if (response.status === "success") {
      setState((prev) => {
        return {
          ...prev,
          article: response.article,
          status: "success",
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
        status: "success",
      };
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await authApi.getUser();

      if (response.status === "success") {
        return response.user;
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

    const loadArticles = async () => {
      const data = await api.getArticles();

      if (data) {
        return data;
      } else {
        setState((prev) => {
          return {
            ...prev,
            status: "error",
          };
        });
      }
    };

    const init = async () => {
      const user = await getUser();

      if (user) {
        const articles = await loadArticles();

        if (articles) {
          setState((prev) => {
            return {
              ...prev,
              articles,
              status: "success",
              user,
            };
          });
        }
      }
    };

    init();
  }, []);

  if (state.status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <AdminContext.Provider value={{ ...state, signIn, signOut, updateArticle }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
