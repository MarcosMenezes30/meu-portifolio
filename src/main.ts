import './styles/global.css';

import './components/base/icon-svg';
import './components/base/base-card';
import './components/base/base-button';
import './components/base/pill-badge';
import './components/base/section-title';
import './components/base/toast-stack';

import './components/layout/nav-drawer';
import './components/layout/app-navbar';
import './components/layout/back-to-top';
import './components/layout/app-footer';

import './components/sections/section-hero';
import './components/sections/section-about';
import './components/sections/section-values';
import './components/sections/section-projects';
import './components/sections/section-skills';
import './components/sections/section-certs';
import './components/sections/section-courses';
import './components/sections/section-contact';

import './components/app-root';

import { loadSiteData } from './services/siteData';

async function bootstrap(): Promise<void> {
  const appRoot = document.querySelector('app-root') as (HTMLElement & { siteData?: unknown }) | null;

  if (!appRoot) return;

  try {
    const data = await loadSiteData();
    appRoot.siteData = data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido ao carregar dados do site.';

    appRoot.innerHTML = `
      <main class="container" style="padding-top: 7rem; padding-bottom: 4rem;">
        <base-card>
          <h1 style="margin-top:0;">Falha ao iniciar o site</h1>
          <p>${message}</p>
        </base-card>
      </main>
    `;

    console.error(error);
  }
}

void bootstrap();

if (import.meta.hot) {
  import.meta.hot.accept(['./services/siteData'], () => {
    void bootstrap();
  });
}
