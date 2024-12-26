export type ShowcaseTypesArray = Category[] | Product[];
export type ShowcaseTypes = Category | Product;

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  color: string;
  category: Category;
  price: number;
  oldPrice: string;
  numberSold: number;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  cartItems: CartItem[];
}

export interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
}
export interface ErrorResponse {
  message: string[];
  error: string;
  statusCode: number;
}
export type ProductWithQuantity = {
  product: Product;
  quantity: number;
};

export type UrlParams = Record<string, string | number>;

export interface SearchUI {
  isExpanded: boolean;
  isAnimating: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}
