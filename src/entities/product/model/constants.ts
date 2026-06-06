import type { ProductStatus } from './types';

export const PRODUCT_STATUS_LABEL: Record<ProductStatus, string> = {
  inStock: 'В наличии',
  lowStock: 'Осталось мало',
  outOfStock: 'Товар закончился',
};
