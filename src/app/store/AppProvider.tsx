import { ReactNode, createContext, useEffect, useState } from "react";

import api from "../../shared/api";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { Article } from "../../shared/types";

interface Props {
  children: ReactNode;
}

interface Context {
  articles: Article[];
  status: "error" | "loading" | "success";
}

const initialState: Context = {
  articles: [],
  status: "loading",
};

export const AppContext = createContext<Context>(initialState);

const AppProvider = ({ children }: Props) => {
  const [state, setState] = useState<Context>(initialState);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await api.getArticles();

      if (data) {
        setState({
          articles: data,
          status: "success",
        });
      } else {
        setState((prev) => {
          return {
            ...prev,
            status: "error",
          };
        });
      }
    };

    loadArticles();
  }, []);

  if (state.status === "loading") {
    return <LoadingScreen />;
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppProvider;
