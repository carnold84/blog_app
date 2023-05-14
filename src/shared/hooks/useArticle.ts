import { useContext } from "react";

import { AppContext } from "../store/AppProvider";

const useArticle = (articleId: string | undefined) => {
  const { articles, status } = useContext(AppContext);

  return {
    article: articles?.filter(({ id }) => id === articleId)[0],
    isError: status === "error",
    isLoading: status === "loading",
  };
};

export default useArticle;
