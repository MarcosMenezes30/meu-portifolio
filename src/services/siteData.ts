import type { SiteData } from '../types/siteData';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasRequiredTopLevel(value: unknown): value is SiteData {
  if (!isObject(value)) return false;

  const requiredKeys: Array<keyof SiteData> = [
    'profile',
    'nav',
    'metricsHero',
    'aboutCards',
    'values',
    'projects',
    'skills',
    'certifications',
    'courses',
    'contact',
    'footer',
  ];

  return requiredKeys.every((key) => key in value);
}

export async function loadSiteData(): Promise<SiteData> {
  const url = new URL('../data/siteData.json', import.meta.url);
  const response = await fetch(url.href, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Falha ao carregar siteData.json: HTTP ${response.status}`);
  }

  const rawData: unknown = await response.json();

  if (!hasRequiredTopLevel(rawData)) {
    throw new Error('siteData.json inválido: estrutura mínima não encontrada.');
  }

  return rawData;
}
