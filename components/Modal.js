'use client';
/* Доступное модальное окно: фокус внутри, Esc и клик по фону закрывают,
   прокрутка страницы блокируется, фокус возвращается на кнопку-источник. */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll, unlockScroll } from '@/lib/client';
import { IconClose } from './Icons';

const FOCUSABLE = 'button:not([disabled]), a[href], input:not([disabled]):not([tabindex="-1"]), select, textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, children, wide = false, labelledBy }) {
  const [mounted, setMounted] = useState(false);
  const box = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const back = document.activeElement;
    lockScroll();
    box.current.scrollTop = 0;
    const t = setTimeout(() => {
      const first = box.current.querySelector('input:not(.trap), select, textarea') || box.current.querySelector(FOCUSABLE);
      first?.focus({ preventScroll: true });
    }, 80);
    const onKey = e => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current(); }
      if (e.key === 'Tab') {
        const f = [...box.current.querySelectorAll(FOCUSABLE)].filter(x => x.offsetParent !== null && !x.classList.contains('trap'));
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      unlockScroll();
      back?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!mounted) return null;
  return createPortal(
    <div className={`modal-overlay${open ? ' open' : ''}`} inert={!open} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={box} className={`modal${wide ? ' wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby={labelledBy} data-lenis-prevent="">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Закрыть"><IconClose /></button>
        {children}
      </div>
    </div>,
    document.body
  );
}
