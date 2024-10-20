/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Article, ArticlesResponse } from "../types/types";
import { getCookie, setCookie } from "./cookies";

const BASE_URL = "https://blog-platform.kata.academy/api";

export const fetchArticles = async (
  page: number,
  limit: number = 6,
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

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      user: { username, email, password },
    });
    const token = response.data.user.token;
    setCookie("token", token, 7);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.errors || new Error("Registration failed!");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      user: { email, password },
    });
    const token = response.data.user.token;
    const username = response.data.user.username;
    setCookie("token", token, 7);
    setCookie("username", username, 7);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.errors || new Error("Login failed!");
  }
};

export const getUserProfile = async () => {
  try {
    const token = getCookie("token");
    setCookie("token", token, 7);
    if (!token) {
      throw new Error("No token found!");
    }
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to fetch user profile");
  }
};

export const updateUserProfile = async (profileData: {
  username: string;
  email: string;
  password: string;
  image: string;
}) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("No token found!");
    }
    const response = await axios.put(
      `${BASE_URL}/user`,
      { user: profileData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.user;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to update user profile");
  }
};

export const toggleLikeArticle = async (slug: string, liked: boolean) => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const url = `${BASE_URL}/articles/${slug}/favorite`;
  try {
    const response = liked
      ? await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      : await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
    return response.data.article;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to toggle like");
  }
};

export const createArticle = async (articleData: {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}) => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/articles`,
      { article: articleData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.article;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to create article");
  }
};

export const updateArticle = async (
  slug: string,
  articleData: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  },
) => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.put(
      `${BASE_URL}/articles/${slug}`,
      { article: articleData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.article;
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to update article");
  }
};

export const deleteArticle = async (slug: string) => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    await axios.delete(`${BASE_URL}/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw error.response?.data || new Error("Failed to delete article");
  }
};
