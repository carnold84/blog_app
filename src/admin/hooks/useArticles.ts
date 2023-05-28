import { useContext } from "react";

import { AdminContext } from "../store/AdminProvider";

const useArticles = () => {
  const { articles, status } = useContext(AdminContext);

  return {
    articles: articles,
    isError: status === "error",
    isLoading: status === "loading",
  };
};

export default useArticles;
