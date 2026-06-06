import type { CartItem } from '@/entities/cart';
import type { CreateOrderPayload, DeliveryAddress, OrderItem } from '@/entities/order';

type CreateOrderDtoParams = {
  deliveryAddress: DeliveryAddress;
  items: CartItem[];
  phone: string;
  userId?: string;
};

function toOrderItem(item: CartItem): OrderItem {
  return {
    productId: item.productId,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  };
}

export function createOrderDto({
  deliveryAddress,
  items,
  phone,
  userId,
}: CreateOrderDtoParams): CreateOrderPayload {
  return {
    userId,
    phone,
    deliveryAddress,
    items: items.map(toOrderItem),
  };
}
