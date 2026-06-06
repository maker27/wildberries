import { ORDER_STAGES, ORDER_STAGE_DURATION_MS, type OrderStage } from '@/entities/order';

export function calculateOrderStage(paidAt: string | undefined, now = Date.now()): OrderStage {
  if (!paidAt) {
    return 'created';
  }

  const paidTime = new Date(paidAt).getTime();
  const diff = now - paidTime;

  // ORDER_STAGES[0] === 'created', поэтому от paidAt стартуем с индекса 1 ('paid').
  const stageIndex = Math.min(1 + Math.floor(diff / ORDER_STAGE_DURATION_MS), ORDER_STAGES.length - 1);

  return ORDER_STAGES[stageIndex];
}

export function getNextStageEta(paidAt: string | undefined, now = Date.now()): number | null {
  if (!paidAt) {
    return null;
  }

  const paidTime = new Date(paidAt).getTime();
  const elapsedStages = Math.floor((now - paidTime) / ORDER_STAGE_DURATION_MS) + 1;

  if (elapsedStages >= ORDER_STAGES.length - 1) {
    return null;
  }

  const nextStageAt = paidTime + elapsedStages * ORDER_STAGE_DURATION_MS;

  return Math.max(0, nextStageAt - now);
}
