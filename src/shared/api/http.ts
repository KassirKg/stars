import { ofetch, type FetchError } from 'ofetch';

import { env } from '@/shared/config/env';

import { ApiError } from './types';

const normalizeError = (error: FetchError): ApiError => {
  const status = error.response?.status ?? 0;
  const data = error.data as { message?: string; code?: string } | undefined;
  return new ApiError(
    status,
    data?.message ?? error.message ?? 'Network error',
    data?.code,
    error.data,
  );
};

const LOCALE_TO_HEADER: Record<string, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  kg: 'ky-KG',
  uz: 'uz-UZ',
  tj: 'tg-TJ',
};

const API_PREFIX = 'api';
const stripSlash = (url: string) => url.replace(/\/$/, '');
const apiBase = `${stripSlash(env.NEXT_PUBLIC_BASE_API_URL)}/${API_PREFIX}`;
const bannersBase = `${stripSlash(env.NEXT_PUBLIC_BANNERS_API_URL)}/v1`;
const ipBase = `${stripSlash(env.NEXT_PUBLIC_IP_API_URL)}/${API_PREFIX}`;

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem('token');
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as unknown;
      return typeof parsed === 'string' ? parsed : null;
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
};

export const http = ofetch.create({
  baseURL: apiBase,
  retry: 0,
  onRequest({ options }) {
    const headers = new Headers(options.headers);
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');
    if (!headers.has('Authorization')) {
      const token = getStoredToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }
    options.headers = headers;
  },
  onResponseError({ error, response }) {
    if (response?.status === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
    }
    if (env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.error('[http] request failed', response?.status, response?.url, error);
    }
  },
});

export const ipApi = ofetch.create({
  baseURL: ipBase,
  retry: 0,
});

const requestPath = (request: unknown): string => {
  if (typeof request === 'string') return request;
  if (request instanceof Request) return request.url;
  return '';
};

export const localeHeader = (locale: string): string => LOCALE_TO_HEADER[locale] ?? locale;

export const bannersApi = ofetch.create({
  baseURL: bannersBase,
  retry: 0,
  onRequest({ options }) {
    const headers = new Headers(options.headers);
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');
    options.headers = headers;
  },
  onResponseError({ request, response }) {
    if (env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.error(
        `[api:banners] ${response?.status} ${bannersBase}${requestPath(request)}`,
        response?._data,
      );
    }
  },
});

const localeClients = new Map<string, ReturnType<typeof ofetch.create>>();

export const httpWithLocale = (locale: string) => {
  const cached = localeClients.get(locale);
  if (cached) return cached;

  const isDev = env.NEXT_PUBLIC_APP_ENV === 'development';

  const client = ofetch.create({
    baseURL: apiBase,
    retry: 0,
    onRequest({ request, options }) {
      const headers = new Headers(options.headers);
      if (!headers.has('Accept')) headers.set('Accept', 'application/json');
      if (!headers.has('Accept-Language')) {
        headers.set('Accept-Language', LOCALE_TO_HEADER[locale] ?? locale);
      }
      options.headers = headers;

      if (isDev) {
        const where = typeof window === 'undefined' ? 'server' : 'client';
        console.info(`[api:${where}] ${options.method ?? 'GET'} ${apiBase}${requestPath(request)}`);
      }
    },
    onResponseError({ request, response }) {
      if (isDev) {
        console.error(
          `[api] ${response?.status} ${apiBase}${requestPath(request)}`,
          response?._data,
        );
      }
    },
  });

  localeClients.set(locale, client);
  return client;
};

export const apiCall = async <T>(request: () => Promise<T>): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.error('[api] запрос не прошёл:', error);
    }
    throw normalizeError(error as FetchError);
  }
};

export const unwrapPayload = (raw: unknown): unknown =>
  typeof raw === 'object' && raw !== null && 'payload' in raw ? raw.payload : raw;
