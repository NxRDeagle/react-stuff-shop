import axios from 'axios';
import { Cart, CartItem, Category, Product, ShowcaseTypes, UrlParams, User } from '../lib/types';
import { API_URL } from './constants';

export const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());
const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};
export const enableScrollbar = () => {
  if (document.body.classList.contains('body-hidden')) {
    document.body.classList.remove('body-hidden');
    document.body.style.paddingRight = '';
  }
};
export const disabledScrollbar = () => {
  if (!document.body.classList.contains('body-hidden')) {
    const scrollbarWidth = getScrollbarWidth();
    document.body.classList.add('body-hidden');
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
};
export const loadCartFromLocalStorage = (): Cart => {
  const storedCart = localStorage.getItem('cart');
  if (!storedCart) return { id: 0, cartItems: [] };

  try {
    const parsed: unknown = JSON.parse(storedCart);

    if (isValidCart(parsed)) {
      return parsed;
    }

    console.warn('Invalid cart data in localStorage');
  } catch (error) {
    console.error('Failed to parse cart from localStorage', error);
  }
  return { id: 0, cartItems: [] };
};

const isValidCart = (data: unknown): data is Cart => {
  if (typeof data !== 'object' || data === null) return false;

  const cart = data as Cart;

  return (
    typeof cart.id === 'number' &&
    Array.isArray(cart.cartItems) &&
    cart.cartItems.every(isValidCartItem)
  );
};

const isValidCartItem = (item: unknown): item is CartItem => {
  if (typeof item !== 'object' || item === null) return false;

  const cartItem = item as CartItem;

  return typeof cartItem.id === 'number' && typeof cartItem.quantity === 'number';
};
export const loadFavoritesFromLocalStorage = (): Product[] => {
  const storedFavorites = localStorage.getItem('favorites');
  if (!storedFavorites) return [];

  try {
    const parsed: unknown = JSON.parse(storedFavorites);

    if (Array.isArray(parsed) && parsed.every(isValidProduct)) {
      return parsed;
    }

    console.warn('Invalid favorites data in localStorage');
    return [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage', error);
    return [];
  }
};

const isValidProduct = (item: unknown): item is Product => {
  if (typeof item !== 'object' || item === null) return false;

  const product = item as Product;

  return (
    typeof product.id === 'number' &&
    Array.isArray(product.images) &&
    typeof product.title === 'string' &&
    typeof product.description === 'string' &&
    typeof product.color === 'string' &&
    typeof product.price === 'number' &&
    typeof product.oldPrice === 'string' &&
    typeof product.numberSold === 'number' &&
    typeof product.category === 'object' &&
    product.category !== null &&
    typeof product.category.id === 'number' &&
    typeof product.category.name === 'string'
  );
};
export const loadUserFromLocalStorage = (): User | null => {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) return null;

  try {
    const parsed: unknown = JSON.parse(storedUser);

    if (isValidUser(parsed)) {
      return parsed;
    }

    console.warn('Invalid user data in localStorage');
    return null;
  } catch (error) {
    console.error('Failed to parse user from localStorage', error);
    return null;
  }
};

const isValidUser = (data: unknown): data is User => {
  if (typeof data !== 'object' || data === null) return false;

  const user = data as User;

  return (
    typeof user.id === 'number' &&
    typeof user.avatar === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string'
  );
};
export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/products/${id}`);
  return {
    ...response.data,
    images: response.data.images.map((item: string) => item.replace(/[\[\]\"]/g, '')),
  };
};

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'stuff_shop');
  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dvrdoeujk/image/upload',
      formData,
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading the image', error);
    throw error;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products?title=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const buildUrl = (url: string, params: UrlParams): string => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return `${url}?${queryString}`;
};

export function isProduct(data: ShowcaseTypes): data is Product {
  return (data as Product).price !== undefined;
}

export function isCategory(data: ShowcaseTypes): data is Category {
  return (data as Category).name !== undefined;
}
