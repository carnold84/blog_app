import { Link } from "react-router-dom";

import useArticles from "../../../shared/hooks/useArticles";

const HomePage = () => {
  const { articles, isError, isLoading } = useArticles();

  return (
    <div>
      {isError && <div>An error occurred :(</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !isError && (
        <div>
          {articles.map(({ id, title }) => {
            return (
              <div key={id}>
                <h2>
                  <Link to={`/article/${id}`}>{title}</Link>
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
