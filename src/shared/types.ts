export interface Article {
  body: string;
  created: string;
  id: string;
  published: string;
  status: "draft" | "published";
  title: string;
  updated: string;
}
