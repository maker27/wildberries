import { Suspense } from 'react';

import { AuthPage } from '@/pages/auth';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  );
}
