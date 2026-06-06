export type CartItem = {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};
