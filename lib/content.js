/* Чтение контента сайта из папки content/ (только на сервере, при сборке). */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { imageSize } from './image-size';

const ROOT = path.join(process.cwd(), 'content');
const PUBLIC = path.join(process.cwd(), 'public');

export function readJSON(name) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, name + '.json'), 'utf8'));
}

export const getSettings = () => readJSON('settings');
export const getPortfolioMeta = () => readJSON('portfolio');
export const getServices = () => readJSON('services');
export const getService = slug => getServices().find(s => s.slug === slug) || null;

/* Продукты студии как список (порядок фиксированный) */
export function getProducts() {
  const raw = readJSON('products');
  const order = ['maruno', 'soon'];
  return order.filter(k => raw[k]).map(k => ({ id: k, ...raw[k] }));
}
export const getProduct = slug => getProducts().find(p => p.slug === slug) || null;

/* Проекты портфолио, подходящие под типы (kind) услуги.
   Реальные проекты показываем первыми. */
export function getProjectsByKinds(kinds = []) {
  if (!kinds.length) return [];
  const rank = { real: 0, concept: 1, template: 2, fan: 3 };
  return getProjects()
    .filter(p => kinds.includes(p.kind))
    .sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9) || a.order - b.order);
}

function withSize(src) {
  if (!src) return null;
  const file = path.join(PUBLIC, src);
  if (!fs.existsSync(file)) return null;
  const size = imageSize(file) || { width: 1600, height: 1000 };
  return { src, ...size };
}

function readProject(file) {
  const slug = file.replace(/\.md$/, '');
  const { data, content } = matter(fs.readFileSync(path.join(ROOT, 'projects', file), 'utf8'));
  return {
    slug,
    title: data.title || slug,
    type: data.type || '',
    niche: data.niche || '',
    kind: data.kind || 'business',
    status: data.status || 'concept',
    platform: data.platform || '',
    link: data.link || '',
    featured: !!data.featured,
    order: Number(data.order ?? 999),
    task: data.task || '',
    result: data.result || '',
    features: Array.isArray(data.features) ? data.features.filter(Boolean) : [],
    cover: withSize(data.cover),
    gallery: (Array.isArray(data.gallery) ? data.gallery : []).map(withSize).filter(Boolean),
    body: content.trim(),
    summary: content.trim().split(/\n\s*\n/)[0].replace(/^- /gm, '').trim(),
  };
}

let cache = null;
export function getProjects() {
  if (cache && process.env.NODE_ENV === 'production') return cache;
  const dir = path.join(ROOT, 'projects');
  cache = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .map(readProject)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'ru'));
  return cache;
}

export function getProject(slug) {
  return getProjects().find(p => p.slug === slug) || null;
}

/* облегчённая версия проекта для клиентских компонентов */
export const toCard = p => ({
  slug: p.slug, title: p.title, type: p.type, niche: p.niche, kind: p.kind,
  status: p.status, platform: p.platform, cover: p.cover, summary: p.summary,
  features: p.features.slice(0, 3), featured: p.featured,
});
