// src/api.ts
import axios from "axios";
import { Article, ArticlesResponse } from "../types/types";

const BASE_URL = "https://blog-platform.kata.academy/api";

export const fetchArticles = async (
  page: number,
  limit: number = 5,
): Promise<ArticlesResponse> => {
  const offset = (page - 1) * limit;
  const response = await axios.get<ArticlesResponse>(
    `${BASE_URL}/articles?limit=${limit}&offset=${offset}`,
  );
  return response.data;
};
export const fetchArticleBySlug = async (slug: string): Promise<Article> => {
  const response = await axios.get(`${BASE_URL}/articles/${slug}`);
  return response.data.article;
};
