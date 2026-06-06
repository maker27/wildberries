export type OrderStage = 'created' | 'paid' | 'assembling' | 'packed' | 'inDelivery' | 'delivered';

export type OrderItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

export type DeliveryAddress = {
  city: string;
  street: string;
  house: string;
  flat?: string;
  comment?: string;
};

export type Order = {
  id: string;
  userId?: string;
  phone: string;
  items: OrderItem[];
  totalPrice: number;
  deliveryAddress: DeliveryAddress;
  createdAt: string;
  paidAt?: string;
};

export type CreateOrderPayload = {
  userId?: string;
  phone: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
};
