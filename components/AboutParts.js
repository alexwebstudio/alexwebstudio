'use client';
/* Интерактивные блоки страницы «Обо мне» */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finePointer, prefersReduced } from '@/lib/client';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* Фраза, слова которой «зажигаются» по мере прокрутки */
export function Statement({ text, accent = [] }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.to('.sw', {
        color: (i, el) => (el.dataset.a ? '#9b86ff' : '#f4f4f6'), stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} className="statement">
      {text.split(' ').map((w, i) => (
        <span key={i}><span className="sw" data-a={accent.includes(w.replace(/[.,—]/g, '')) ? '1' : undefined}>{w}</span>{' '}</span>
      ))}
    </p>
  );
}

/* Этапы работы — аккордеон прошлой версии (автопереключение на десктопе) */
export function ProcessAccordion({ steps }) {
  const [active, setActive] = useState(0);
  const box = useRef(null);
  useEffect(() => {
    if (prefersReduced() || !finePointer()) return;
    let id = null, hover = false;
    const start = () => { clearInterval(id); id = setInterval(() => { if (!hover) setActive(a => (a + 1) % steps.length); }, 3500); };
    const st = ScrollTrigger.create({ trigger: box.current, start: 'top 75%', end: 'bottom top', onToggle: s => (s.isActive ? start() : clearInterval(id)) });
    const enter = () => { hover = true; }, leave = () => { hover = false; };
    box.current.addEventListener('pointerenter', enter);
    box.current.addEventListener('pointerleave', leave);
    const el = box.current;
    return () => { clearInterval(id); st.kill(); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); };
  }, [steps.length]);

  return (
    <div ref={box} className="acc">
      {steps.map((s, i) => (
        <button key={s.t} type="button" className={`acc-item${i === active ? ' active' : ''}`}
          aria-expanded={i === active} onClick={() => setActive(i)}
          onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(i); }}>
          <span className="acc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <span className="acc-body">
            <span className="acc-title">{s.t}</span>
            <span className="acc-desc">{s.d}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* Принципы: номер загорается, когда карточка попадает в экран */
export function Principles({ items }) {
  const ref = useRef(null);
  useEffect(() => {
    const cards = ref.current.querySelectorAll('.pcard');
    if (prefersReduced()) { cards.forEach(c => c.classList.add('lit')); return; }
    const ctx = gsap.context(() => {
      gsap.from(cards, { y: 50, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } });
      cards.forEach(c => ScrollTrigger.create({ trigger: c, start: 'top 75%', once: true, onEnter: () => c.classList.add('lit') }));
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="pgrid">
      {items.map((p, i) => (
        <article key={p.t} className="pcard">
          <span className="pc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h3>{p.t}</h3>
          <p>{p.d}</p>
        </article>
      ))}
    </div>
  );
}

/* Бегущая строка крупными контурными буквами */
export function Marquee({ words }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => { gsap.to('.marquee-track', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 }); }, ref);
    return () => ctx.revert();
  }, []);
  const set = <div className="marquee-set">{words.map(w => <span key={w} style={{ display: 'contents' }}><span>{w}</span><i>///</i></span>)}</div>;
  return (
    <div ref={ref} className="marquee" aria-hidden="true">
      <div className="marquee-track">{set}{set}</div>
    </div>
  );
}
