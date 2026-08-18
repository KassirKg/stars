import { setRequestLocale } from 'next-intl/server';

import { assertLocale } from '@/shared/lib/i18n';
import { HomeView } from '@/views/home';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  // до любых запросов: layout рендерится параллельно, его notFound() сюда не успевает
  assertLocale(locale);

  setRequestLocale(locale);
  return <HomeView locale={locale} />;
};

export default HomePage;
