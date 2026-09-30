'use client';
/* Частые вопросы — аккордеон на кнопках с aria-expanded */
import { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import faq from '@/content/faq.json';
import Reveal from './Reveal';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const toggle = i => {
    setOpen(o => (o === i ? -1 : i));
    setTimeout(() => ScrollTrigger.refresh(), 600);
  };
  return (
    <Reveal stagger className="faq">
      {faq.map((f, i) => (
        <div key={f.q} className={`faq-item${open === i ? ' open' : ''}`}>
          <h3>
            <button type="button" className="faq-q" id={`faq-q${i}`} aria-expanded={open === i} aria-controls={`faq-a${i}`} onClick={() => toggle(i)}>
              {f.q}<span className="faq-ic" aria-hidden="true" />
            </button>
          </h3>
          <div className="faq-a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}>
            <div><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
