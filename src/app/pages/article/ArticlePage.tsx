import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useParams } from "react-router-dom";

import useArticle from "../../hooks/useArticle";

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
              <h1 className="text-text-500">{article.title}</h1>
              <ReactMarkdown className="text-text-400">
                {article.content}
              </ReactMarkdown>
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
