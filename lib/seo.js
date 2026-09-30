import { getSettings } from './content';

/* Хлебные крошки в формате schema.org (BreadcrumbList) для rich-результатов.
   items: [{ name, path }] — path без домена. */
export function breadcrumbsLd(items) {
  const base = getSettings().siteUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: base + it.path,
    })),
  };
}

export function jsonLdScript(obj) {
  return { __html: JSON.stringify(obj).replace(/</g, '\\u003c') };
}
