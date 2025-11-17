// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
  },

  // Переписывания: пользователь видит /de, /en, но контент берётся
  // из существующих вложенных путей /de/de и /de/en
  async rewrites() {
    return [
      // корневые локали (видимый URL -> реальное местоположение)
      { source: '/de', destination: '/de/de' },
      { source: '/en', destination: '/de/en' },

      // блог: /de/blog/:slug -> /de/de/blog/:slug
      { source: '/de/blog/:slug*', destination: '/de/de/blog/:slug*' },
      { source: '/en/blog/:slug*', destination: '/de/en/blog/:slug*' },

      // все прочие пути внутри локали — проброс к вложенной структуре
      { source: '/de/:rest*', destination: '/de/de/:rest*' },
      { source: '/en/:rest*', destination: '/de/en/:rest*' },
    ];
  },

  // (опционально) Если хотите вместо "маскировки" делать внешний редирект,
  // раскомментируйте блок ниже и закомментируйте/удалите rewrites.
  /*
  async redirects() {
    return [
      { source: '/de', destination: '/de/de', permanent: false },
      { source: '/en', destination: '/de/en', permanent: false },
    ];
  },
  */
};

module.exports = nextConfig;
