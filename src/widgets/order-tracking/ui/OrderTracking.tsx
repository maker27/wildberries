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

  useEffect(() => {
    void requestPermission();
  }, [requestPermission]);

  const eta = now === null ? null : getNextStageEta(order.paidAt, now);
  const currentIndex = ORDER_STAGES.indexOf(currentStage);

  return (
    <section className="order-tracking flex flex-col gap-6">
      <header className="order-tracking__header flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-6 shadow-sm">
        <div className="order-tracking__title-wrap flex flex-col gap-1">
          <h1 className="order-tracking__title text-xl font-bold text-[#1a1a1a]">
            Заказ №{order.id.slice(0, 8)}
          </h1>
          <span className="order-tracking__phone text-sm text-[#777]">{order.phone}</span>
        </div>
        <OrderStatusBadge stage={currentStage} />
      </header>

      {!order.paidAt ? (
        <div className="order-tracking__pay flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-[#444]">Заказ ещё не оплачен. Оплатите его, чтобы началась сборка.</p>
          <Link className="max-w-xs" href={routes.payment(order.id)}>
            <Button>Перейти к оплате</Button>
          </Link>
        </div>
      ) : null}

      {inAppMessage ? (
        <div className="order-tracking__in-app flex items-center justify-between gap-3 rounded-xl bg-[#f7e6f3] p-4 text-sm text-[#a60d8c]">
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
                  isDone && 'bg-[#cb11ab] text-white',
                  isActive && 'bg-[#cb11ab] text-white ring-4 ring-[#f7e6f3]',
                  !isDone && !isActive && 'bg-[#eeeeee] text-[#999]',
                )}
              >
                {isDone ? '✓' : index + 1}
              </span>
              <span
                className={cn(
                  'order-tracking__label text-sm',
                  isActive ? 'font-semibold text-[#1a1a1a]' : 'text-[#777]',
                )}
              >
                {ORDER_STAGE_LABEL[stage]}
              </span>
              {isActive && eta !== null ? (
                <span className="order-tracking__eta ml-auto text-xs text-[#999]">
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
