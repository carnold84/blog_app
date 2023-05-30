import { Article } from "../../types";

export interface Data {
  articles: Article[];
}

let data: Data;

export const saveData = (data: Data) => {
  localStorage.setItem("blog_app_data", JSON.stringify(data));
};

export const getData = () => {
  const savedData = localStorage.getItem("blog_app_data");
  return savedData ? JSON.parse(savedData) : null;
};

export const getArticles = async () => {
  data = getData();

  if (data === null) {
    const response = await fetch("/demo_data.json");
    data = await response.json();
    saveData(data);
  }

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
