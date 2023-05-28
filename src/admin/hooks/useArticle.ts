import { useContext } from "react";

import { AdminContext } from "../store/AdminProvider";

const useArticle = (articleId: string | undefined) => {
  const { articles, status } = useContext(AdminContext);

  return {
    article: articles?.filter(({ id }) => id === articleId)[0],
    isError: status === "error",
    isLoading: status === "loading",
  };
};

export default useArticle;
