import { type LegalDoc, type LegalDocs, type LegalSlug } from './types';

const LOADERS: Record<string, () => Promise<{ legal: LegalDocs }>> = {
  ru: () => import('./ru'),
  en: () => import('./en'),
  kg: () => import('./kg'),
};

export const getLegalDoc = async (locale: string, slug: LegalSlug): Promise<LegalDoc> => {
  const load = LOADERS[locale] ?? LOADERS.en!;
  const { legal } = await load();

  return legal[slug];
};

export { LEGAL_SLUGS } from './types';
export type { LegalDoc, LegalSection, LegalSlug } from './types';
