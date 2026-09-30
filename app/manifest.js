export default function manifest() {
  return {
    name: 'AlexWebStudio',
    short_name: 'alexwebstudio',
    description: 'Веб-студия: сайты для бизнеса в России и Казахстане.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050507',
    theme_color: '#050507',
    lang: 'ru',
    icons: [
      { src: '/images/favicon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
    ],
  };
}
