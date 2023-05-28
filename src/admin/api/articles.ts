import { Data, getData, saveData } from "../../shared/api/demo";
import { Article } from "../../shared/types";

export interface ArticleResponse {
  article?: Article;
  message?: string;
  status: "error" | "success";
}

export const updateArticle = async (article: Article) => {
  return new Promise<ArticleResponse>((resolve) => {
    const data = getData();
    let nextArticle: Article;
    const nextData: Data = {
      articles: data.articles.map(({ id }: Article) => {
        if (article.id === id) {
          nextArticle = {
            ...article,
            content: article.content,
            title: article.title,
          };

          return nextArticle;
        }

        return article;
      }),
    };

    saveData(nextData);

    setTimeout(() => {
      resolve({
        article: nextArticle,
        status: "success",
      });
    }, 1000);
  });
};
