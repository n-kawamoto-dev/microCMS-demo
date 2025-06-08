import { createClient } from "microcms-js-sdk";
import type { News, Category } from "../types/microcmsTypes";

export const client = createClient({
  serviceDomain: import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export const getNewsList = async () => {
  return await client.getList<News>({ endpoint: "news" });
};

export const getNewsBySlug = async (slug: string) => {
  return await client.getListDetail<News>({
    endpoint: "news",
    contentId: slug,
  });
};

export const getCategories = async () => {
  return await client.getList<Category>({ endpoint: "categories" });
};

export const getNewsByCategory = async (categoryId: string) => {
  const { contents: categories } = await getCategories();
  const matchedCategory = categories.find((cat) => cat.categoryId === categoryId);
  const realId = matchedCategory?.id;

  if (!realId) {
    console.warn("カテゴリが見つかりません:", categoryId);
    return { contents: [] };
  }

  return await client.getList<News>({
    endpoint: "news",
    queries: {
      filters: `category[equals]${realId}`,
    },
  });
};

export const getNewsByYear = async (year: string) => {
  const allNews = await getNewsList();
  return {
    contents: allNews.contents.filter((item) =>
      item.publishedAt?.startsWith(year)
    ),
  };
};
