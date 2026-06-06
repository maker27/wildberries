export type ProductCharacteristic = {
  name: string;
  value: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  category: string;
  characteristics: ProductCharacteristic[];
};
