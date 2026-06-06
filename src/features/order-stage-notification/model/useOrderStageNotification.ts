'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ORDER_STAGE_NOTIFICATION, type OrderStage } from '@/entities/order';
import { requestNotificationPermission, showBrowserNotification } from '@/shared/lib/notifications/notifications';

type UseOrderStageNotificationResult = {
  inAppMessage: string | null;
  dismissInApp: () => void;
  requestPermission: () => Promise<boolean>;
};

export function useOrderStageNotification(stage: OrderStage): UseOrderStageNotificationResult {
  const previousStageRef = useRef<OrderStage | null>(null);
  const [inAppMessage, setInAppMessage] = useState<string | null>(null);

  useEffect(() => {
    // Первая фиксация стадии при маунте — базовая линия, без уведомления.
    if (previousStageRef.current === null) {
      previousStageRef.current = stage;

      return;
    }

    if (previousStageRef.current === stage) {
      return;
    }

    previousStageRef.current = stage;

    const message = ORDER_STAGE_NOTIFICATION[stage];
    const isBrowserNotified =
      typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';

    if (isBrowserNotified) {
      showBrowserNotification(message);
    } else {
      setInAppMessage(message);
    }
  }, [stage]);

  const requestPermission = useCallback(() => requestNotificationPermission(), []);

  const dismissInApp = useCallback(() => setInAppMessage(null), []);

  return { inAppMessage, dismissInApp, requestPermission };
}
