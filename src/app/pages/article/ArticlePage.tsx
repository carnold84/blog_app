import { Link, useParams } from "react-router-dom";

import useArticle from "../../../shared/hooks/useArticle";

const ArticlePage = () => {
  const { id } = useParams();
  const { article, isLoading } = useArticle(id);

  return (
    <div>
      <Link to={"/"}>Back</Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {article ? (
            <div>
              <h1>{article.title}</h1>
              <p>{article.body}</p>
            </div>
          ) : (
            <p>Article not found</p>
          )}
        </>
      )}
    </div>
  );
};

export default ArticlePage;