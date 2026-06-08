'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ORDER_STAGES, ORDER_STAGE_LABEL, type Order, OrderStatusBadge } from '@/entities/order';
import { useOrderStageNotification } from '@/features/order-stage-notification';
import { routes } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn/cn';
import { Button } from '@/shared/ui/button/Button';

import { calculateOrderStage, getNextStageEta } from '../lib/calculateOrderStage';

type OrderTrackingProps = {
  order: Order;
};

const TICK_INTERVAL_MS = 1000;

function formatEta(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const intervalId = setInterval(() => setNow(Date.now()), TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  const currentStage = calculateOrderStage(order.paidAt, now ?? undefined);
  const { inAppMessage, dismissInApp, requestPermission } = useOrderStageNotification(currentStage);

  // Permission запрашиваем только по действию пользователя, не на маунте.
  // Поддержку и статус читаем в эффекте, чтобы не было hydration mismatch.
  const [canAskNotifications, setCanAskNotifications] = useState(false);

  useEffect(() => {
    setCanAskNotifications('Notification' in window && Notification.permission === 'default');
  }, []);

  const handleEnableNotifications = async () => {
    await requestPermission();
    setCanAskNotifications(false);
  };

  const eta = now === null ? null : getNextStageEta(order.paidAt, now);
  const currentIndex = ORDER_STAGES.indexOf(currentStage);

  return (
    <section className="order-tracking flex flex-col gap-6">
      <header className="order-tracking__header flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-6 shadow-sm">
        <div className="order-tracking__title-wrap flex flex-col gap-1">
          <h1 className="order-tracking__title text-fg text-xl font-bold">Заказ №{order.id.slice(0, 8)}</h1>
          <span className="order-tracking__phone text-muted text-sm">{order.phone}</span>
        </div>
        <OrderStatusBadge stage={currentStage} />
      </header>

      {canAskNotifications ? (
        <div className="order-tracking__notify flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-6 shadow-sm">
          <p className="text-label text-sm">Включите уведомления, чтобы узнавать о смене статуса заказа.</p>
          <Button onClick={handleEnableNotifications} variant="secondary">
            Включить уведомления
          </Button>
        </div>
      ) : null}

      {!order.paidAt ? (
        <div className="order-tracking__pay flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm">
          <p className="text-label text-sm">Заказ ещё не оплачен. Оплатите его, чтобы началась сборка.</p>
          <Link className="max-w-xs" href={routes.payment(order.id)}>
            <Button>Перейти к оплате</Button>
          </Link>
        </div>
      ) : null}

      {inAppMessage ? (
        <div className="order-tracking__in-app bg-accent-soft text-accent-dark flex items-center justify-between gap-3 rounded-xl p-4 text-sm">
          <span>{inAppMessage}</span>
          <button className="font-medium hover:underline" onClick={dismissInApp} type="button">
            Скрыть
          </button>
        </div>
      ) : null}

      <ol className="order-tracking__stages flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm">
        {ORDER_STAGES.map((stage, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li className="order-tracking__stage flex items-center gap-3" key={stage}>
              <span
                className={cn(
                  'order-tracking__marker flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs',
                  isDone && 'bg-accent text-white',
                  isActive && 'bg-accent ring-accent-soft text-white ring-4',
                  !isDone && !isActive && 'bg-track text-subtle',
                )}
              >
                {isDone ? '✓' : index + 1}
              </span>
              <span
                className={cn(
                  'order-tracking__label text-sm',
                  isActive ? 'text-fg font-semibold' : 'text-muted',
                )}
              >
                {ORDER_STAGE_LABEL[stage]}
              </span>
              {isActive && eta !== null ? (
                <span className="order-tracking__eta text-subtle ml-auto text-xs">
                  след. этап через {formatEta(eta)}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
