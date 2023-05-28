export interface Article {
  content: string;
  createdAt: string;
  description: string;
  id: string;
  publishedAt: string;
  status: "draft" | "published";
  title: string;
  updatedAt: string;
}
