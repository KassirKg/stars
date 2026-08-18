import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { fetchAllProducts, productKeys } from '@/entities/product/server';
import { getQueryClient } from '@/shared/api';
import { ProductsList } from '@/widgets/productsList';

export const HomeProducts = async ({ locale }: { locale: string }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: productKeys.list(locale),
    queryFn: () => fetchAllProducts(locale),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList />
    </HydrationBoundary>
  );
};
