import path from 'path';
import {defineConfig} from 'vite';

const rootDir = import.meta.dirname;

const PERSONALIZED_HTML = new Set([
  '/profile.html',
  '/donation-history.html',
  '/confirmation.html',
]);

function getStaticCachePolicy(urlPath = ''): string | null {
  const cleanPath = urlPath.split('?')[0];

  if (PERSONALIZED_HTML.has(cleanPath)) {
    return 'private, no-store';
  }

  if (cleanPath.endsWith('.html') || cleanPath === '/') {
    return 'public, max-age=0, must-revalidate';
  }

  // Content-hashed JS/CSS production bundles under /assets/ (e.g. main-DKNQboar.css)
  if (/^\/assets\/[^/]+[.-][a-zA-Z0-9_-]{6,}\.(js|css)$/.test(cleanPath)) {
    return 'public, max-age=31536000, immutable';
  }

  // Static logos, NGO images, favicons
  if (
    cleanPath.startsWith('/assets/images/') ||
    cleanPath.startsWith('/assets/favicon/') ||
    cleanPath.startsWith('/assets/aistudio/') ||
    cleanPath === '/favicon.ico'
  ) {
    return 'public, max-age=604800, stale-while-revalidate=86400';
  }

  return null;
}

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'give-aid-cache-headers',
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const policy = getStaticCachePolicy(req.url || '');
            if (policy) {
              res.setHeader('Cache-Control', policy);
              const originalSetHeader = res.setHeader.bind(res);
              res.setHeader = ((name: string, value: number | string | readonly string[]) => {
                if (name.toLowerCase() === 'cache-control') {
                  return originalSetHeader(name, policy);
                }
                return originalSetHeader(name, value);
              }) as typeof res.setHeader;
            }
            next();
          });
        },
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const cleanPath = (req.url || '').split('?')[0];
            if (PERSONALIZED_HTML.has(cleanPath)) {
              res.setHeader('Cache-Control', 'private, no-store');
            } else if (
              cleanPath.startsWith('/assets/images/') ||
              cleanPath.startsWith('/assets/favicon/') ||
              cleanPath.startsWith('/assets/aistudio/') ||
              cleanPath === '/favicon.ico'
            ) {
              res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          about: path.resolve(rootDir, 'about.html'),
          whatWeDo: path.resolve(rootDir, 'what-we-do.html'),
          ourMission: path.resolve(rootDir, 'our-mission.html'),
          ourTeam: path.resolve(rootDir, 'our-team.html'),
          achievements: path.resolve(rootDir, 'achievements.html'),
          supporters: path.resolve(rootDir, 'supporters.html'),
          donate: path.resolve(rootDir, 'donate.html'),
          programmes: path.resolve(rootDir, 'programmes.html'),
          ngos: path.resolve(rootDir, 'ngos.html'),
          ngoDetail: path.resolve(rootDir, 'ngo-detail.html'),
          gallery: path.resolve(rootDir, 'gallery.html'),
          help: path.resolve(rootDir, 'help.html'),
          contact: path.resolve(rootDir, 'contact.html'),
          register: path.resolve(rootDir, 'register.html'),
          login: path.resolve(rootDir, 'login.html'),
          profile: path.resolve(rootDir, 'profile.html'),
          donationHistory: path.resolve(rootDir, 'donation-history.html'),
          confirmation: path.resolve(rootDir, 'confirmation.html'),
          registerInterest: path.resolve(rootDir, 'register-interest.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
