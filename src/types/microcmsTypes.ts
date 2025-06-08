export type Category = {
  id: string;
  name: string;
  categoryId: string;
};

export type News = {
  id: string;
  title: string;
  content: string;
  category: Category;
  image?: {
    url: string;
    height: number;
    width: number;
  };
  publishedAt?: string;
};