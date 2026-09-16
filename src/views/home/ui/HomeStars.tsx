import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { fetchArtistCategories, artistCategoryKeys } from '@/entities/artistCategory/server';
import { prefetchArtists } from '@/entities/starHuman/server';
import { FilterArtistsList } from '@/features/filterArtists';
import { getQueryClient } from '@/shared/api';
import { StarsList } from '@/widgets/starsList';

interface HomeStarsProps {
  locale: string;
  category: string;
}

export const HomeStars = async ({ locale, category }: HomeStarsProps) => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: artistCategoryKeys.list(locale),
      queryFn: () => fetchArtistCategories(locale),
    }),
    prefetchArtists(queryClient, locale, category),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterArtistsList selected={category} />
      <StarsList category={category} />
    </HydrationBoundary>
  );
};
