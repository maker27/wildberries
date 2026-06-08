import { HomePage } from '@/pages/home';

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return <HomePage query={q} />;
}
