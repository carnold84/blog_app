import { ReactNode, createContext, useEffect, useState } from "react";

import { articlesApi } from "../api";
import LoadingScreen from "../component/LoadingScreen";
import { Article } from "../types";

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
      const data = await articlesApi.getArticles();

      setState({
        articles: data,
        status: "success",
      });
    };

    loadArticles();
  }, []);

  if (state.status === "loading") {
    return <LoadingScreen />;
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppProvider;
