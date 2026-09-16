import {
  Aperture,
  BookOpen,
  Camera,
  ChefHat,
  Clapperboard,
  Disc3,
  Drama,
  Guitar,
  Headphones,
  LayoutGrid,
  Laugh,
  MicVocal,
  MonitorPlay,
  Music,
  Palette,
  PersonStanding,
  Podcast,
  Star,
  Trophy,
  Tv,
  Video,
  type LucideIcon,
} from 'lucide-react';

export const ALL_CATEGORIES_ICON: LucideIcon = LayoutGrid;

export const FALLBACK_CATEGORY_ICON: LucideIcon = Star;

const ICON_MATCHERS: ReadonlyArray<{ icon: LucideIcon; tokens: readonly string[] }> = [
  { icon: MicVocal, tokens: ['singer', 'vocal', 'певц', 'певиц', 'вокал', 'ырчы'] },
  { icon: Guitar, tokens: ['rock', 'guitar', 'рок', 'гитар'] },
  { icon: Disc3, tokens: ['dj', 'диджей', 'диджеи'] },
  { icon: Headphones, tokens: ['producer', 'beatmaker', 'продюсер', 'битмейкер'] },
  { icon: Music, tokens: ['musician', 'band', 'group', 'музыкант', 'группы', 'ансамбл'] },
  { icon: Clapperboard, tokens: ['actor', 'cinema', 'актёр', 'актер', 'кино', 'актрис'] },
  { icon: Drama, tokens: ['artist', 'theatre', 'theater', 'артист', 'театр'] },
  { icon: Laugh, tokens: ['comedian', 'standup', 'stand-up', 'комик', 'юмор'] },
  { icon: Video, tokens: ['blogger', 'vlog', 'influencer', 'блогер', 'блогго'] },
  { icon: MonitorPlay, tokens: ['streamer', 'gamer', 'стример', 'геймер'] },
  { icon: Podcast, tokens: ['podcast', 'подкаст'] },
  { icon: Tv, tokens: ['host', 'presenter', 'ведущ', 'телевед'] },
  { icon: PersonStanding, tokens: ['dancer', 'танцор', 'танц', 'бийчи'] },
  { icon: Trophy, tokens: ['athlete', 'sport', 'спортсмен', 'спорт'] },
  { icon: Camera, tokens: ['model', 'модел'] },
  { icon: Aperture, tokens: ['photographer', 'фотограф'] },
  { icon: Palette, tokens: ['designer', 'painter', 'дизайн', 'художник'] },
  { icon: BookOpen, tokens: ['writer', 'poet', 'писател', 'поэт'] },
  { icon: ChefHat, tokens: ['chef', 'cook', 'повар', 'шеф'] },
];

export const categoryIcon = (slug: string, name = ''): LucideIcon => {
  const haystack = `${slug} ${name}`.toLowerCase();
  const found = ICON_MATCHERS.find(({ tokens }) => tokens.some((t) => haystack.includes(t)));

  return found?.icon ?? FALLBACK_CATEGORY_ICON;
};
