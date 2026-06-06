import Link from 'next/link';

import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button/Button';
import { Container } from '@/shared/ui/container/Container';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';

export default function NotFound() {
  return (
    <Container className="py-16">
      <EmptyState
        action={
          <Link href={routes.home}>
            <Button>На главную</Button>
          </Link>
        }
        description="Страница или товар не найдены."
        title="404"
      />
    </Container>
  );
}
