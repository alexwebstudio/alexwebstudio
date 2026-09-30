import Link from 'next/link';
import { notFound } from 'next/navigation';
import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import WorkCard from '@/components/WorkCard';
import { IconArrow, IconArrowUp } from '@/components/Icons';
import about from '@/content/about.json';
import { getProduct, getProducts, getProjectsByKinds, toCard } from '@/lib/content';
import { breadcrumbsLd, jsonLdScript } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: (p.purpose || p.desc).slice(0, 180),
    alternates: { canonical: `/products/${p.slug}` },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = getProjectsByKinds(p.kinds).slice(0, 3).map(toCard);
  const others = getProducts().filter(x => x.slug !== p.slug);
  const soon = !p.link;
  const crumbsLd = breadcrumbsLd([
    { name: 'Главная', path: '/' },
    { name: 'Полезные работы', path: '/#useful' },
    { name: p.short, path: `/products/${p.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(crumbsLd)} />
      <section className="svc-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Навигация">
            <Link href="/">Главная</Link><span>/</span><Link href="/#useful">Полезные работы</Link><span>/</span><span aria-current="page">{p.short}</span>
          </Reveal>
          <div className="svc-hero-grid">
            <div>
              <Reveal as="p" className="pj-kicker">{p.tag}</Reveal>
              <Heading as="h1" className="h-hero" manual text={p.title} />
              <Reveal as="p" className="lede">{p.desc}</Reveal>
              <Reveal className="svc-hero-cta">
                {p.link
                  ? <a className="btn btn-primary" href={p.link} target="_blank" rel="noopener noreferrer">Перейти на сайт <IconArrowUp /></a>
                  : <Link className="btn btn-primary" href="/brief">Обсудить проект <IconArrow /></Link>}
                <Link className="link-u" href="/#useful">Все продукты</Link>
              </Reveal>
            </div>
            {p.stats?.length > 0 && (
              <Reveal as="dl" className="svc-facts">
                {p.stats.map(s => <div key={s.lab}><dt>{s.lab}</dt><dd dangerouslySetInnerHTML={{ __html: s.val }} /></div>)}
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {soon ? (
        <section className="section-tight">
          <div className="wrap">
            <p className="lede">{p.purpose}</p>
          </div>
        </section>
      ) : (
        <>
          <section className="section-tight">
            <div className="wrap svc-cols">
              {p.task && (
                <Reveal as="section" className="svc-col">
                  <h2 className="h3">Какую задачу решает</h2>
                  <p>{p.task}</p>
                  {p.audience && <><h2 className="h3" style={{ marginTop: 32 }}>Кому подходит</h2><p>{p.audience}</p></>}
                </Reveal>
              )}
              {p.benefits?.length > 0 && (
                <Reveal as="section" className="svc-col">
                  <h2 className="h3">Основные возможности</h2>
                  <ul className="svc-inc">{p.benefits.map(b => <li key={b[0]}><b>{b[0]}</b> — {b[1]}</li>)}</ul>
                </Reveal>
              )}
            </div>
          </section>

          {p.events?.length > 0 && (
            <section className="section-tight band">
              <div className="wrap">
                <Heading className="h2" text="Для каких *событий*" />
                <Reveal className="prod-events">{p.events.map(e => <span key={e}>{e}</span>)}</Reveal>
              </div>
            </section>
          )}

          <section className="section-tight">
            <div className="wrap">
              <Heading className="h2" text="Как проходит *работа*" />
              <Reveal stagger className="proc-row">
                {about.process.map((s, i) => (
                  <div className="proc-step" key={s.t}>
                    <span className="proc-n">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        </>
      )}

      {related.length > 0 && (
        <section className="section-tight band">
          <div className="wrap">
            <div className="s-head">
              <Heading className="h2" text="Похожие *работы*" />
              <Reveal className="s-side"><Link className="link-u" href="/portfolio">Всё портфолио <IconArrow /></Link></Reveal>
            </div>
            <Reveal stagger className="works">
              {related.map(w => <WorkCard key={w.slug} p={w} sizes="(max-width: 900px) 100vw, 33vw" />)}
            </Reveal>
          </div>
        </section>
      )}

      <div className="wrap">
        <CtaBand title="Нужен такой же *инструмент*?" text="Расскажите о задаче — предложу решение и следующий шаг." />
        {others.length > 0 && (
          <nav className="svc-more-nav" aria-label="Другие продукты">
            {others.map(o => <Link key={o.slug} href={`/products/${o.slug}`}><span>{o.short}</span><IconArrow /></Link>)}
          </nav>
        )}
      </div>
    </>
  );
}
