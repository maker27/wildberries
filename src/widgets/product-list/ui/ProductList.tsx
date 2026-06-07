import { type Product, ProductCard } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';

// Первые карточки — над сгибом. Грузим приоритетно только пару: слишком много
// одновременных priority-картинок на слабой сети наоборот тормозит реальный LCP.
const PRIORITY_CARDS_COUNT = 2;

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  return (
    <ul className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <li className="product-list__item grid" key={product.id}>
          <ProductCard
            action={
              <AddToCartButton
                disabled={product.status === 'outOfStock'}
                item={{
                  productId: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                }}
              />
            }
            priority={index < PRIORITY_CARDS_COUNT}
            product={product}
          />
        </li>
      ))}
    </ul>
  );
}
