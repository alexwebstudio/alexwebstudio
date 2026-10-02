'use client';
/* Общие части форм: способ связи, запасная отправка, экран успеха */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import settings from '@/content/settings.json';
import { CONTACT_KINDS, isPhoneKind, leadText, maskPhone } from '@/lib/lead';
import { prefersReduced } from '@/lib/client';
import { IconPhone, IconTelegram, IconWhatsapp } from './Icons';

const KIND_ICONS = { telegram: IconTelegram, whatsapp: IconWhatsapp, phone: IconPhone };

export function ContactFields({ kind, setKind, value, setValue, error, idPrefix = 'c' }) {
  const k = CONTACT_KINDS[kind];
  const valueRef = useRef(value);
  valueRef.current = value;

  // при выборе «телефон/WhatsApp» сразу форматируем уже введённое значение
  useEffect(() => {
    if (isPhoneKind(kind)) {
      const masked = maskPhone(valueRef.current);
      if (masked !== valueRef.current) setValue(masked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  const onChange = e => setValue(isPhoneKind(kind) ? maskPhone(e.target.value) : e.target.value);

  return (
    <>
      <div className="field">
        <span className="f-lab" id={`${idPrefix}-kind`}>Как с вами связаться *</span>
        <div className="seg" role="radiogroup" aria-labelledby={`${idPrefix}-kind`}>
          {Object.entries(CONTACT_KINDS).map(([key, v]) => {
            const Icon = KIND_ICONS[key];
            return (
              <label key={key}>
                <input type="radio" name={`${idPrefix}-kind`} value={key} checked={kind === key} onChange={() => setKind(key)} />
                <span><Icon />{v.label}</span>
              </label>
            );
          })}
        </div>
      </div>
      <div className={`field${error ? ' err' : ''}`}>
        <label className="f-lab" htmlFor={`${idPrefix}-contact`}>{k.label} *</label>
        <input id={`${idPrefix}-contact`} className="input" type={k.type} inputMode={k.inputMode} autoComplete={kind === 'telegram' ? 'off' : 'tel'}
          placeholder={k.placeholder} value={value} onChange={onChange} maxLength={kind === 'telegram' ? 40 : 18} aria-invalid={!!error} aria-describedby={error ? `${idPrefix}-contact-err` : undefined} />
        {error && <p className="f-err" id={`${idPrefix}-contact-err`}>{k.error}</p>}
      </div>
    </>
  );
}

/* Если сервер не смог отправить заявку, ответы не теряются:
   готовый текст уходит в WhatsApp или копируется для Telegram. */
export function LeadFallback({ title, rows }) {
  const [copied, setCopied] = useState(false);
  const text = leadText(title, rows);
  const { whatsapp, telegram } = settings.contacts;
  const wa = whatsapp ? `${whatsapp}${whatsapp.includes('?') ? '&' : '?'}text=${encodeURIComponent(text)}` : '';
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); } catch { setCopied(false); }
    window.open(telegram, '_blank', 'noopener');
  };
  return (
    <div className="fallback" role="alert">
      <p>Автоматическая отправка сейчас недоступна — ваши ответы не потерялись. Отправьте готовую заявку одним нажатием:</p>
      <div className="btns">
        {wa && <a className="btn btn-primary btn-sm" href={wa} target="_blank" rel="noopener noreferrer"><IconWhatsapp /> Отправить в WhatsApp</a>}
        {telegram && <button type="button" className="btn btn-ghost btn-sm" onClick={copy}><IconTelegram /> {copied ? 'Скопировано — вставьте в чат' : 'Скопировать и открыть Telegram'}</button>}
      </div>
    </div>
  );
}

export function LeadSuccess({ title, text }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const path = ref.current.querySelector('path');
    const len = path.getTotalLength();
    const t = gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 });
    const c = gsap.from(ref.current, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'back.out(2)' });
    return () => { t.kill(); c.kill(); };
  }, []);
  return (
    <div className="success" role="status">
      <span ref={ref} className="ok-mark" aria-hidden="true">
        <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
      </span>
      <p className="success-eyebrow">Заявка отправлена</p>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
