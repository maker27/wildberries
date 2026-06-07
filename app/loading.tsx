import { Container } from '@/shared/ui/container/Container';
import { Spinner } from '@/shared/ui/spinner/Spinner';

export default function Loading() {
  return (
    <Container className="route-loading flex min-h-[60vh] items-center justify-center py-16">
      <Spinner className="h-10 w-10" />
    </Container>
  );
}
