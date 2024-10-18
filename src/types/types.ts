export interface Author {
  username: string;
  image: string;
}
export interface Article {
  slug: string;
  title: string;
  body: string;
  tagList: string[];
  description: string;
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}
export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
export interface UserApiResponse {
  email: string;
  password: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
}
export interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}
