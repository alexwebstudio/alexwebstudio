import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { IconArrowUp } from '@/components/Icons';
import meta from '@/content/portfolio.json';
import { getProject, getProjects } from '@/lib/content';
import { parseBody } from '@/lib/markdown';
import { breadcrumbsLd, jsonLdScript } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const desc = `${[p.type, p.niche].filter(Boolean).join(' · ')}. ${p.summary}`.slice(0, 180);
  return {
    title: `${p.title} — ${meta.statuses[p.status]?.label.toLowerCase()}`,
    description: desc,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: {
      type: 'article', locale: 'ru_RU', siteName: 'AlexWebStudio',
      url: `/portfolio/${p.slug}`,
      images: p.cover
        ? [{ url: p.cover.src, width: p.cover.width, height: p.cover.height, alt: `Скриншот сайта ${p.title}` }]
        : [{ url: '/images/preview.jpg', width: 1200, height: 1200, alt: 'AlexWebStudio' }],
    },
  };
}

function Body({ text }) {
  return parseBody(text).map((b, i) =>
    b.type === 'list' ? <ul key={i}>{b.items.map(x => <li key={x}>{x}</li>)}</ul>
      : b.type === 'h' ? <h3 key={i}>{b.text}</h3>
        : <p key={i}>{b.text}</p>);
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const all = getProjects();
  const i = all.findIndex(x => x.slug === p.slug);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  const status = meta.statuses[p.status];
  const tall = p.cover && p.cover.height > p.cover.width * 1.3;
  const host = p.link ? new URL(p.link).host.replace(/^www\./, '') : '';

  const facts = [
    ['Статус', status.label],
    ['Тип', p.type],
    ['Сфера', p.niche],
    ['Платформа', p.platform],
    ['Сайт', p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer">{host} ↗</a> : ''],
  ].filter(f => f[1]);

  const crumbsLd = breadcrumbsLd([
    { name: 'Главная', path: '/' },
    { name: 'Портфолио', path: '/portfolio' },
    { name: p.title, path: `/portfolio/${p.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(crumbsLd)} />
      <section className="pj-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Навигация">
            <Link href="/">Главная</Link><span>/</span><Link href="/portfolio">Портфолио</Link><span>/</span><span aria-current="page">{p.title}</span>
          </Reveal>
          <div className="pj-head">
            <div>
              <Reveal as="p" className="pj-kicker">{[p.type, p.niche].filter(Boolean).join(' · ')}</Reveal>
              <Heading as="h1" className="h-hero" manual text={p.title} />
            </div>
            <Reveal className="pj-actions">
              {p.link && <a className="btn btn-primary" href={p.link} target="_blank" rel="noopener noreferrer">Открыть сайт <IconArrowUp /></a>}
              <Link className="link-u" href="/portfolio">Все работы</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="wrap">
        {p.cover && (
          <Reveal className={`pj-shot${tall ? ' tall' : ''}`} data-lenis-prevent={tall ? '' : undefined} tabIndex={tall ? 0 : undefined} aria-label={tall ? 'Скриншот целиком — прокрутите' : undefined}>
            <Image src={p.cover.src} alt={`Скриншот сайта ${p.title}`} width={p.cover.width} height={p.cover.height} sizes={tall ? '520px' : '(max-width: 1360px) 100vw, 1250px'} priority quality={85} />
          </Reveal>
        )}

        <div className="pj-body">
          <aside>
            <Reveal as="dl" className="pj-facts">
              {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </Reveal>
            <Reveal className="pj-note"><b>{status.label}</b>{status.note}</Reveal>
          </aside>
          <div className="pj-text">
            <Reveal as="section">
              <h2>О проекте</h2>
              <Body text={p.body} />
            </Reveal>
            {p.task && <Reveal as="section"><h2>Задача клиента</h2><p>{p.task}</p></Reveal>}
            {p.features.length > 0 && (
              <Reveal as="section">
                <h2>{p.status === 'real' ? 'Что есть на сайте' : 'Что показано в концепте'}</h2>
                <ul className="pj-feats">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
              </Reveal>
            )}
            {p.result && <Reveal as="section"><h2>Итог</h2><p>{p.result}</p></Reveal>}
          </div>
        </div>

        {p.gallery.length > 0 && (
          <div className="pj-gallery">
            {p.gallery.map(g => (
              <Reveal as="figure" key={g.src}><Image src={g.src} alt={`${p.title} — дополнительный экран`} width={g.width} height={g.height} sizes="100vw" /></Reveal>
            ))}
          </div>
        )}

        <nav className="pj-nav" aria-label="Другие проекты">
          <Link href={`/portfolio/${prev.slug}`}><small>← Предыдущий</small><strong>{prev.title}</strong></Link>
          <Link href={`/portfolio/${next.slug}`}><small>Следующий →</small><strong>{next.title}</strong></Link>
        </nav>

        <CtaBand title="Нужен похожий *сайт*?" text="Расскажите о задаче в квизе — предложу подходящий формат и следующий шаг." />
      </div>
    </>
  );
}

