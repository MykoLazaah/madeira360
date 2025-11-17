// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
  },

  // Внутренние переписывания (rewrites) — оставляем URL "/de" видимым,
  // но отдаем содержимое из "/de/de"
  async rewrites() {
    return [
      // корень локали: /de -> /de/de, /en -> /de/en
      { source: '/de', destination: '/de/de' },
      { source: '/en', destination: '/de/en' },

      // блог: /de/blog/slug -> /de/de/blog/slug
      { source: '/de/blog/:slug*', destination: '/de/de/blog/:slug*' },
      { source: '/en/blog/:slug*', destination: '/de/en/blog/:slug*' },

      // любые другие пути внутри локали — пробрасываем аналогично
      // пример: /de/some/path -> /de/de/some/path
      { source: '/de/:rest*', destination: '/de/de/:rest*' },
      { source: '/en/:rest*', destination: '/de/en/:rest*' },
    ]
  },

  // (опционально) если хотите внешние редиректы вместо "маскировки" URL,
  // замените/добавьте правила ниже:
  /*
  async redirects() {
    return [
      { source: '/de', destination: '/de/de', permanent: false },
      { source: '/en', destination: '/de/en', permanent: false },
    ]
  },
  */
};

module.exports = nextConfig;
