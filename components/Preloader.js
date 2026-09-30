'use client';
/* Прелоадер студии. Показывается один раз за сессию. Без процентов и
   без обычной полосы загрузки. Уходит «отгибом» из нижнего правого угла
   с мягким размытием, открывая главную страницу. */
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { holdReady, lockScroll, prefersReduced, releaseReady, session, unlockScroll } from '@/lib/client';

export default function Preloader() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const pl = document.querySelector('.pl');
    if (!pl || html.classList.contains('no-preload') || prefersReduced()) {
      html.classList.add('no-preload');
      return;
    }
    holdReady();
    lockScroll();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      session.set('aws-seen', 1);
      unlockScroll();
      html.classList.add('no-preload');
    };

    const start = performance.now();
    const MIN = 700, MAX = 2200;
    let timer;

    const run = () => {
      clearTimeout(timer);
      const wait = Math.max(0, MIN - (performance.now() - start));
      timer = setTimeout(() => {
        gsap.timeline({ onComplete: finish })
          .to('.pl-inner', { opacity: 0, filter: 'blur(10px)', y: -14, duration: 0.4, ease: 'power2.in' })
          .add(() => releaseReady(), '>-0.1')                      // главная начинает проявляться под отгибом
          .to('.pl', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',   // отгиб уходит из нижнего правого угла
            filter: 'blur(14px)', duration: 0.85, ease: 'power3.inOut',
          }, '<0.05')
          .to('.pl-fold', { opacity: 0, duration: 0.5, ease: 'power2.out' }, '<')
          .set('.pl', { display: 'none' });
      }, wait);
    };

    // не запускаем тяжёлый уход, пока страница не готова; но и не блокируем дольше MAX
    if (document.readyState === 'complete') run();
    else {
      const onLoad = () => run();
      window.addEventListener('load', onLoad, { once: true });
      timer = setTimeout(run, MAX);
      return () => { window.removeEventListener('load', onLoad); clearTimeout(timer); if (!done) { unlockScroll(); releaseReady(); } };
    }
    return () => { clearTimeout(timer); if (!done) { unlockScroll(); releaseReady(); } };
  }, []);

  return (
    <div className="pl" aria-hidden="true">
      <div className="pl-fold" />
      <div className="pl-inner">
        <div className="pl-name">alex<b>web</b>studio</div>
        <div className="pl-sub">студия полного цикла</div>
      </div>
      <div className="pl-tag">RU · KZ</div>
    </div>
  );
}
