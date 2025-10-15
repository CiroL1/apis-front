// src/components/Admin/Product/types.ts
export interface ProductResponse {
  id?: string;
  name: string;
  price: number;
  images?: string[];
  category?: string;
  subcategories?: string[]; // en tu caso pueden venir desde groups -> mapear si hace falta
  featured?: boolean;
  description?: string;
  specifications?: Record<string, string>;
  colors?: string[];
  storageOptions?: string[];
  reviews?: {
    user: string;
    rating: number;
    comment: string;
    date: string;
    avatar: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  groups?: { id: string; name: string }[];
}
