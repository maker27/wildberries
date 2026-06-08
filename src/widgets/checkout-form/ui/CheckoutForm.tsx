'use client';

import { EmptyState } from '@/shared/ui/empty-state/EmptyState';
import { Input } from '@/shared/ui/input/Input';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { Textarea } from '@/shared/ui/textarea/Textarea';

import { useCheckoutForm } from '../model/useCheckoutForm';
import { CheckoutSummary } from './CheckoutSummary';

export function CheckoutForm() {
  const {
    errors,
    fields,
    handleChange,
    handleSubmit,
    isError,
    isHydrated,
    isLoading,
    isLoggedIn,
    items,
    total,
  } = useCheckoutForm();

  if (!isHydrated) {
    return (
      <div className="checkout-form flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        description="Добавьте товары в корзину, прежде чем оформлять заказ."
        title="Корзина пуста"
      />
    );
  }

  return (
    <form className="checkout-form grid grid-cols-1 gap-6 lg:grid-cols-3" onSubmit={handleSubmit}>
      <div className="checkout-form__fields flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="checkout-form__section-title text-fg text-lg font-semibold">Получатель</h2>
        <Input
          error={errors.name}
          label="Имя"
          onChange={(event) => handleChange('name')(event.target.value)}
          value={fields.name}
        />
        <Input
          className={isLoggedIn ? 'bg-canvas text-muted cursor-not-allowed' : undefined}
          error={errors.phone}
          hint={isLoggedIn ? 'Телефон из вашего профиля' : undefined}
          label="Телефон"
          onChange={(event) => handleChange('phone')(event.target.value)}
          readOnly={isLoggedIn}
          type="tel"
          value={fields.phone}
        />

        <h2 className="checkout-form__section-title text-fg mt-2 text-lg font-semibold">Адрес доставки</h2>
        <Input
          error={errors.city}
          label="Город"
          onChange={(event) => handleChange('city')(event.target.value)}
          value={fields.city}
        />
        <Input
          error={errors.street}
          label="Улица"
          onChange={(event) => handleChange('street')(event.target.value)}
          value={fields.street}
        />
        <div className="checkout-form__row grid grid-cols-2 gap-4">
          <Input
            error={errors.house}
            label="Дом"
            onChange={(event) => handleChange('house')(event.target.value)}
            value={fields.house}
          />
          <Input
            label="Квартира"
            onChange={(event) => handleChange('flat')(event.target.value)}
            value={fields.flat}
          />
        </div>
        <Textarea
          label="Комментарий к заказу"
          onChange={(event) => handleChange('comment')(event.target.value)}
          value={fields.comment}
        />
      </div>

      <CheckoutSummary isError={isError} isLoading={isLoading} items={items} total={total} />
    </form>
  );
}
