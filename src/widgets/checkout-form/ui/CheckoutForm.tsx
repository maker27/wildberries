'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { selectCartItems, selectCartTotal, useCartStore } from '@/entities/cart';
import { useCreateOrderMutation } from '@/entities/order';
import { useUserStore } from '@/entities/user';
import { createOrderDto } from '@/features/create-order';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button/Button';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';
import { Input } from '@/shared/ui/input/Input';
import { Price } from '@/shared/ui/price/Price';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { Textarea } from '@/shared/ui/textarea/Textarea';

type FormFields = {
  name: string;
  phone: string;
  city: string;
  street: string;
  house: string;
  flat: string;
  comment: string;
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

const REQUIRED_FIELDS: (keyof FormFields)[] = ['name', 'phone', 'city', 'street', 'house'];

const INITIAL_FIELDS: FormFields = {
  name: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  flat: '',
  comment: '',
};

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (!fields[field].trim()) {
      errors[field] = 'Обязательное поле';
    }
  }

  return errors;
}

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useUserStore((state) => state.user);
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  useEffect(() => {
    if (user?.phone) {
      setFields((prev) => (prev.phone ? prev : { ...prev, phone: user.phone }));
    }
  }, [user]);

  const handleChange = (field: keyof FormFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(fields);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const dto = createOrderDto({
      deliveryAddress: {
        city: fields.city,
        street: fields.street,
        house: fields.house,
        flat: fields.flat || undefined,
        comment: fields.comment || undefined,
      },
      items,
      phone: fields.phone,
      userId: user?.id,
    });

    try {
      const order = await createOrder(dto).unwrap();
      clearCart();
      router.replace(routes.payment(order.id));
    } catch {
      // Ошибка показывается ниже по форме через isError.
    }
  };

  if (!isHydrated) {
    return (
      <div className="checkout-form flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState description="Добавьте товары в корзину, прежде чем оформлять заказ." title="Корзина пуста" />
    );
  }

  return (
    <form className="checkout-form grid grid-cols-1 gap-6 lg:grid-cols-3" onSubmit={handleSubmit}>
      <div className="checkout-form__fields flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="checkout-form__section-title text-lg font-semibold text-[#1a1a1a]">Получатель</h2>
        <Input error={errors.name} label="Имя" onChange={(event) => handleChange('name')(event.target.value)} value={fields.name} />
        <Input error={errors.phone} label="Телефон" onChange={(event) => handleChange('phone')(event.target.value)} type="tel" value={fields.phone} />

        <h2 className="checkout-form__section-title mt-2 text-lg font-semibold text-[#1a1a1a]">Адрес доставки</h2>
        <Input error={errors.city} label="Город" onChange={(event) => handleChange('city')(event.target.value)} value={fields.city} />
        <Input error={errors.street} label="Улица" onChange={(event) => handleChange('street')(event.target.value)} value={fields.street} />
        <div className="checkout-form__row grid grid-cols-2 gap-4">
          <Input error={errors.house} label="Дом" onChange={(event) => handleChange('house')(event.target.value)} value={fields.house} />
          <Input label="Квартира" onChange={(event) => handleChange('flat')(event.target.value)} value={fields.flat} />
        </div>
        <Textarea label="Комментарий к заказу" onChange={(event) => handleChange('comment')(event.target.value)} value={fields.comment} />
      </div>

      <aside className="checkout-form__summary flex h-fit flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="checkout-form__section-title text-lg font-semibold text-[#1a1a1a]">Ваш заказ</h2>
        <ul className="checkout-form__items flex flex-col gap-2">
          {items.map((item) => (
            <li className="checkout-form__item flex justify-between gap-2 text-sm" key={item.productId}>
              <span className="text-[#444]">
                {item.title} × {item.quantity}
              </span>
              <Price value={item.price * item.quantity} />
            </li>
          ))}
        </ul>
        <div className="checkout-form__total flex items-center justify-between border-t border-[#f0f0f0] pt-3">
          <span className="text-[#777]">Итого</span>
          <Price className="text-xl font-bold" value={total} />
        </div>
        {isError ? (
          <p className="checkout-form__error text-sm text-[#e53935]">Не удалось создать заказ. Попробуйте ещё раз.</p>
        ) : null}
        <Button disabled={isLoading} fullWidth size="lg" type="submit">
          {isLoading ? 'Оформление…' : 'Перейти к оплате'}
        </Button>
      </aside>
    </form>
  );
}
