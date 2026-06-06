import { type Product, ProductCard } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  return (
    <ul className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li className="product-list__item" key={product.id}>
          <ProductCard
            action={
              <AddToCartButton
                item={{
                  productId: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                }}
              />
            }
            product={product}
          />
        </li>
      ))}
    </ul>
  );
}
