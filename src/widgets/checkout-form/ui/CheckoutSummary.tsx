import type { CartItem } from '@/entities/cart';
import { Button } from '@/shared/ui/button/Button';
import { Price } from '@/shared/ui/price/Price';

type CheckoutSummaryProps = {
  isError: boolean;
  isLoading: boolean;
  items: CartItem[];
  total: number;
};

export function CheckoutSummary({ isError, isLoading, items, total }: CheckoutSummaryProps) {
  return (
    <aside className="checkout-form__summary flex h-fit flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="checkout-form__section-title text-fg text-lg font-semibold">Ваш заказ</h2>
      <ul className="checkout-form__items flex flex-col gap-2">
        {items.map((item) => (
          <li className="checkout-form__item flex justify-between gap-2 text-sm" key={item.productId}>
            <span className="text-label">
              {item.title} × {item.quantity}
            </span>
            <Price value={item.price * item.quantity} />
          </li>
        ))}
      </ul>
      <div className="checkout-form__total border-border-light flex items-center justify-between border-t pt-3">
        <span className="text-muted">Итого</span>
        <Price className="text-xl font-bold" value={total} />
      </div>
      {isError ? (
        <p className="checkout-form__error text-error text-sm">
          Не удалось создать заказ. Попробуйте ещё раз.
        </p>
      ) : null}
      <Button disabled={isLoading} fullWidth size="lg" type="submit">
        {isLoading ? 'Оформление…' : 'Перейти к оплате'}
      </Button>
    </aside>
  );
}
