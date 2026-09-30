'use client';
/* Избранные работы: выбранный проект — в крупной карточке, остальные —
   в сетке ниже. Единственный источник состояния: индекс выбранного, поэтому
   выбранный проект не дублируется в сетке. */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { projectSub } from './WorkCard';
import Reveal from './Reveal';
import { IconArrow } from './Icons';
import { prefersReduced, scrollToTarget } from '@/lib/client';

export default function Showcase({ projects }) {
  const [active, setActive] = useState(0);
  const big = useRef(null);
  const firstRun = useRef(true);
  const p = projects[active];
  const rest = projects.map((x, i) => ({ x, i })).filter(({ i }) => i !== active);

  /* при выборе проекта показываем крупную карточку: если она не в поле
     зрения (актуально для мобильных, где карточка выше списка) — плавно
     прокручиваем к ней. */
  const select = i => {
    setActive(i);
    const el = big.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72;
      if (r.top < headerH + 8 || r.top > innerHeight * 0.6) scrollToTarget(el);
    });
  };

  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (prefersReduced() || !big.current) return;
    const t = gsap.fromTo(big.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    return () => t.kill();
  }, [active]);

  return (
    <div className="showcase">
      <Reveal>
        <article ref={big} className="sc-big">
          <Link href={`/portfolio/${p.slug}`} className="sc-big-media" aria-label={`Открыть проект ${p.title}`}>
            {p.cover && <Image src={p.cover.src} alt={`Скриншот сайта ${p.title}`} fill sizes="(max-width: 900px) 100vw, 60vw" priority />}
          </Link>
          <div className="sc-big-body">
            <div className="sc-big-kind">{projectSub(p)}{p.platform ? ` · ${p.platform}` : ''}</div>
            <h3 className="sc-big-title">{p.title}</h3>
            <p className="sc-big-sum">{p.summary}</p>
            <Link className="btn btn-primary" href={`/portfolio/${p.slug}`}>Открыть проект <IconArrow /></Link>
          </div>
        </article>
      </Reveal>

      <Reveal stagger className="sc-rest">
        {rest.map(({ x, i }) => (
          <button type="button" key={x.slug} className="sc-tile" onClick={() => select(i)} aria-label={`Показать проект ${x.title}`}>
            <span className="sc-tile-media">
              {x.cover && <Image src={x.cover.src} alt="" fill sizes="(max-width: 900px) 50vw, 22vw" />}
            </span>
            <span className="sc-tile-meta">
              <span className="sc-tile-title">{x.title}</span>
              <span className="sc-tile-sub">{projectSub(x)}</span>
            </span>
          </button>
        ))}
      </Reveal>
    </div>
  );
}
