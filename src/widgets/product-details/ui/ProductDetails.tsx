import Image from 'next/image';

import { type Product, ProductPrice, ProductRating } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="product-details grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="product-details__gallery relative aspect-square overflow-hidden rounded-xl bg-white">
        <Image
          alt={product.title}
          className="product-details__image object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          src={product.image}
        />
      </div>

      <div className="product-details__info flex flex-col gap-4">
        <h1 className="product-details__title text-2xl font-bold text-[#1a1a1a]">{product.title}</h1>
        <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} />
        <ProductPrice oldPrice={product.oldPrice} price={product.price} />

        <p className="product-details__description text-sm text-[#444]">{product.description}</p>

        <div className="product-details__cart max-w-xs">
          <AddToCartButton
            item={{
              productId: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            }}
          />
        </div>

        <div className="product-details__characteristics mt-2">
          <h2 className="product-details__characteristics-title mb-2 text-lg font-semibold text-[#1a1a1a]">
            Характеристики
          </h2>
          <dl className="product-details__characteristics-list flex flex-col gap-2">
            {product.characteristics.map((characteristic) => (
              <div
                className="product-details__characteristic flex justify-between gap-4 border-b border-[#f0f0f0] py-1 text-sm"
                key={characteristic.name}
              >
                <dt className="text-[#777]">{characteristic.name}</dt>
                <dd className="text-right font-medium text-[#1a1a1a]">{characteristic.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
