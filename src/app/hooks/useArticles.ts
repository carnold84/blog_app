import { useContext } from "react";

import { AppContext } from "../store/AppProvider";

const useArticles = () => {
  const { articles, status } = useContext(AppContext);

  return {
    articles: articles,
    isError: status === "error",
    isLoading: status === "loading",
  };
};

export default useArticles;
