export const routes = {
  home: '/',
  cart: '/cart',
  checkout: '/checkout',
  auth: '/auth',
  product: (id: string) => `/products/${id}`,
  payment: (orderId: string) => `/payment/${orderId}`,
  orderTracking: (orderId: string) => `/orders/${orderId}/tracking`,
} as const;
