import { Article } from "../types";

const getArticles = async () => {
  const response = await fetch("/demo_data.json");
  const data = await response.json();

  return new Promise<Article[]>((resolve) => {
    setTimeout(() => {
      resolve(
        data.articles.map((article: Article) => {
          return {
            ...article,
            id: article.id.toString(),
          };
        })
      );
    }, 1000);
  });
};

export { getArticles };
