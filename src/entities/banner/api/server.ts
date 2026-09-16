import 'server-only';

import { bannersApi, localeHeader, unwrapPayload } from '@/shared/api/http';

import { bannersSchema, type Banner } from './schemas';

export const getBanners = async (locale: string): Promise<Banner[]> => {
  try {
    const raw = await bannersApi<unknown>('/banner', {
      headers: { 'Accept-Language': localeHeader(locale) },
    });
    const banners = bannersSchema.parse(unwrapPayload(raw));
    return banners.slice().sort((a, b) => a.priority - b.priority);
  } catch {
    return [];
  }
};
