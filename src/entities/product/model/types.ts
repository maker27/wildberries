export type ProductCharacteristic = {
  name: string;
  value: string;
};

export type ProductStatus = 'inStock' | 'lowStock' | 'outOfStock';

export type Product = {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  category: string;
  badge?: string;
  status: ProductStatus;
  stockNote?: string;
  characteristics: ProductCharacteristic[];
};
