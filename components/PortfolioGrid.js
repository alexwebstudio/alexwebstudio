'use client';
/* Портфолио: фильтр по типу, переключатель «только реальные», «показать ещё» */
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import meta from '@/content/portfolio.json';
import WorkCard from './WorkCard';
import { prefersReduced } from '@/lib/client';

const PER = 8;

export default function PortfolioGrid({ projects }) {
  const [kind, setKind] = useState('all');
  const [onlyReal, setOnlyReal] = useState(false);
  const [shown, setShown] = useState(PER);
  const grid = useRef(null);
  const firstRender = useRef(true);

  const cats = useMemo(() => [
    { id: 'all', label: 'Все', n: projects.length },
    ...meta.kinds.map(k => ({ ...k, n: projects.filter(p => p.kind === k.id).length })).filter(k => k.n),
  ], [projects]);

  const list = projects.filter(p => (kind === 'all' || p.kind === kind) && (!onlyReal || p.status === 'real'));
  const visible = list.slice(0, shown);

  /* плавное появление карточек при смене фильтра и при первом показе */
  useEffect(() => {
    if (prefersReduced()) return;
    const items = grid.current.querySelectorAll('.work');
    const ctx = gsap.context(() => {
      if (firstRender.current) {
        firstRender.current = false;
        gsap.set(items, { y: 40, opacity: 0 });
        ScrollTrigger.batch(items, { start: 'top 94%', once: true,
          onEnter: b => gsap.to(b, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 }) });
      } else {
        gsap.fromTo(items, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05 });
      }
    }, grid);
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [kind, onlyReal, shown]);

  return (
    <>
      <div className="pf-bar">
        <div className="pf-filter" role="group" aria-label="Тип проекта">
          {cats.map(c => (
            <button key={c.id} type="button" className="pf-cat" aria-pressed={kind === c.id} onClick={() => { setKind(c.id); setShown(PER); }}>
              {c.label}<span>{c.n}</span>
            </button>
          ))}
        </div>
        <label className="toggle">
          <input type="checkbox" checked={onlyReal} onChange={e => { setOnlyReal(e.target.checked); setShown(PER); }} />
          <span className="tr" aria-hidden="true" />
          Только реальные проекты
        </label>
      </div>
      <p className="sr-only" aria-live="polite">Показано проектов: {visible.length} из {list.length}</p>
      <div ref={grid} className="works alt">
        {visible.map((p, i) => <WorkCard key={p.slug} p={p} index={projects.indexOf(p)} priority={i < 2} />)}
        {!list.length && <p className="pf-empty">В этой категории пока нет реальных проектов — посмотрите концепты.</p>}
      </div>
      {shown < list.length && (
        <button type="button" className="btn btn-ghost pf-more" onClick={() => setShown(s => s + PER)}>
          Показать ещё · {list.length - shown}
        </button>
      )}
    </>
  );
}
