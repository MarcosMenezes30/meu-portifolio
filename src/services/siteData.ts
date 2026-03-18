import type { SiteData } from '../types/siteData';
import siteData from '../data/siteData.json';

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
  const rawData: unknown = siteData;

  if (!hasRequiredTopLevel(rawData)) {
    throw new Error('siteData.json inválido: estrutura mínima não encontrada.');
  }

  return rawData;
}
