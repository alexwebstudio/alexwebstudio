'use client';
/* Мягкое проявление содержимого при переходе между страницами */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReduced } from '@/lib/client';

export default function Template({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const t = gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'opacity' });
    return () => t.kill();
  }, []);
  return <div ref={ref}>{children}</div>;
}
