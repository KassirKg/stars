import { setRequestLocale } from 'next-intl/server';

import { assertLocale } from '@/shared/lib/i18n';
import { CATEGORY_PARAM, categoryFromParam } from '@/shared/model';
import { HomeView } from '@/views/home';

interface HomePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const HomePage = async ({ params, searchParams }: HomePageProps) => {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  assertLocale(locale);

  setRequestLocale(locale);
  return <HomeView locale={locale} category={categoryFromParam(query[CATEGORY_PARAM])} />;
};

export default HomePage;
