import type { OrderStage } from './types';

export const ORDER_STAGE_DURATION_MS = 5 * 60 * 1000;

export const ORDER_STAGES = ['created', 'paid', 'assembling', 'packed', 'inDelivery', 'delivered'] as const;

export const ORDER_STAGE_LABEL: Record<OrderStage, string> = {
  created: 'Заказ создан',
  paid: 'Заказ оплачен',
  assembling: 'Заказ собирается',
  packed: 'Заказ упакован',
  inDelivery: 'Заказ передан в доставку',
  delivered: 'Заказ доставлен',
};

export const ORDER_STAGE_NOTIFICATION: Record<OrderStage, string> = {
  created: 'Ваш заказ создан',
  paid: 'Ваш заказ оплачен',
  assembling: 'Ваш заказ собирается',
  packed: 'Ваш заказ упакован',
  inDelivery: 'Ваш заказ передан в доставку',
  delivered: 'Ваш заказ доставлен',
};
