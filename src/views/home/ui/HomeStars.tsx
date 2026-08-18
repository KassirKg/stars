import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { fetchArtistCategories, artistCategoryKeys } from '@/entities/artistCategory/server';
import { fetchAllArtists, artistKeys } from '@/entities/starHuman/server';
import { FilterArtistsList } from '@/features/filterArtists';
import { getQueryClient } from '@/shared/api';
import { StarsList } from '@/widgets/starsList';

export const HomeStars = async ({ locale }: { locale: string }) => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: artistCategoryKeys.list(locale),
      queryFn: () => fetchArtistCategories(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: artistKeys.list(locale),
      queryFn: () => fetchAllArtists(locale),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterArtistsList />
      <StarsList />
    </HydrationBoundary>
  );
};
