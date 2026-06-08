'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { selectCartItems, selectCartTotal, useCartStore } from '@/entities/cart';
import { useCreateOrderMutation } from '@/entities/order';
import { useUserStore } from '@/entities/user';
import { createOrderDto } from '@/features/create-order';
import { routes } from '@/shared/config/routes';
import { formatPhone } from '@/shared/lib/phone/phone';

export type CheckoutFormFields = {
  name: string;
  phone: string;
  city: string;
  street: string;
  house: string;
  flat: string;
  comment: string;
};

export type CheckoutFieldErrors = Partial<Record<keyof CheckoutFormFields, string>>;

const REQUIRED_FIELDS: (keyof CheckoutFormFields)[] = ['name', 'phone', 'city', 'street', 'house'];

const INITIAL_FIELDS: CheckoutFormFields = {
  name: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  flat: '',
  comment: '',
};

function validate(fields: CheckoutFormFields): CheckoutFieldErrors {
  const errors: CheckoutFieldErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (!fields[field].trim()) {
      errors[field] = 'Обязательное поле';
    }
  }

  return errors;
}

export function useCheckoutForm() {
  const router = useRouter();
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useUserStore((state) => state.user);
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  const [fields, setFields] = useState<CheckoutFormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<CheckoutFieldErrors>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  useEffect(() => {
    if (user?.phone) {
      setFields((prev) => (prev.phone ? prev : { ...prev, phone: formatPhone(user.phone) }));
    }
  }, [user]);

  const handleChange = (field: keyof CheckoutFormFields) => (value: string) => {
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
      // Ошибка показывается в форме через isError.
    }
  };

  return {
    errors,
    fields,
    handleChange,
    handleSubmit,
    isError,
    isHydrated,
    isLoading,
    isLoggedIn: Boolean(user),
    items,
    total,
  };
}
