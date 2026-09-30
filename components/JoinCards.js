'use client';
/* «Вступить в команду»: две карточки и форма заявки во всплывающем окне */
import { useState } from 'react';
import join from '@/content/join.json';
import Modal from './Modal';
import Reveal from './Reveal';
import { ContactFields, LeadFallback, LeadSuccess } from './LeadParts';
import { IconArrow } from './Icons';
import { CONTACT_KINDS, checkContact, sendLead } from '@/lib/lead';

const CARDS = [
  { exp: 'yes', k: 'Есть опыт', title: 'С опытом',
    text: 'Для тех, кто уже делал реальные проекты и умеет доводить задачу до результата.',
    hint: 'Расскажите, что у вас получается лучше всего, и приложите ссылку на работы.' },
  { exp: 'no', k: 'Нет опыта', title: 'Без опыта',
    text: 'Для тех, кто только начинает, быстро учится и хочет расти на настоящих задачах.',
    hint: 'Портфолио не обязательно. Расскажите, чему хотите научиться и почему выбрали это направление.' },
];

const EMPTY = { name: '', occupation: '', direction: '', about: '', extra: '', trap: '' };

function JoinForm({ initialExp }) {
  const [f, setF] = useState(EMPTY);
  const [exp, setExp] = useState(initialExp);
  const [kind, setKind] = useState('telegram');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | failed
  const set = k => e => { setF(v => ({ ...v, [k]: e.target.value })); if (errors[k]) setErrors(x => ({ ...x, [k]: false })); };

  const rows = () => [
    ['Имя', f.name.trim()],
    [CONTACT_KINDS[kind].label, contact.trim()],
    ['Чем занимается', f.occupation.trim()],
    ['Опыт', exp === 'yes' ? 'Есть опыт' : 'Нет опыта'],
    ['Направление', f.direction],
    ['О себе / портфолио', f.about.trim()],
    ['Дополнительно', f.extra.trim()],
  ];

  const submit = async e => {
    e.preventDefault();
    const err = {
      name: f.name.trim().length < 2,
      contact: !checkContact(kind, contact),
      occupation: !f.occupation.trim(),
      direction: !f.direction,
      about: f.about.trim().length < 10,
    };
    setErrors(err);
    const first = Object.keys(err).find(k => err[k]);
    if (first) { document.getElementById(first === 'contact' ? 'j-contact' : `j-${first}`)?.focus(); return; }
    setState('sending');
    try {
      await sendLead({ source: 'join', title: 'Заявка в команду', rows: rows(), trap: f.trap });
      setState('done');
    } catch {
      setState('failed');
    }
  };

  if (state === 'done') {
    return <LeadSuccess title="Спасибо, заявка у меня" text="Посмотрю её и напишу, когда появится подходящая задача. Сразу ответить не всегда получается — но каждую заявку я читаю." />;
  }

  const F = ({ id, label, children, err, hint }) => (
    <div className={`field${err ? ' err' : ''}`}>
      <label className="f-lab" htmlFor={id}>{label}</label>
      {children}
      {err && <p className="f-err" id={`${id}-err`}>{hint}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate>
      <div className="m-tag">Заявка в команду</div>
      <h2 className="m-title" id="joinTitle">Расскажите о себе</h2>
      <p className="m-desc" style={{ marginBottom: 24 }}>Сейчас нет открытых вакансий — заявка попадёт в список тех, к кому я обращусь, когда появятся подходящие задачи.</p>

      <input className="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.trap} onChange={set('trap')} name="company" />

      {F({ id: 'j-name', label: 'Имя *', err: errors.name, hint: 'Укажите имя',
        children: <input id="j-name" className="input" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'j-name-err' : undefined} /> })}

      <ContactFields idPrefix="j" kind={kind} setKind={k => { setKind(k); setErrors(x => ({ ...x, contact: false })); }} value={contact}
        setValue={v => { setContact(v); if (errors.contact) setErrors(x => ({ ...x, contact: false })); }} error={errors.contact} />

      {F({ id: 'j-occupation', label: 'Чем вы сейчас занимаетесь *', err: errors.occupation, hint: 'Напишите пару слов: учёба, работа, фриланс…',
        children: <input id="j-occupation" className="input" placeholder="Например: учусь на дизайнера, работаю в продажах" value={f.occupation} onChange={set('occupation')} aria-invalid={!!errors.occupation} /> })}

      <div className="field">
        <span className="f-lab" id="j-exp">Есть ли опыт *</span>
        <div className="seg" role="radiogroup" aria-labelledby="j-exp">
          {[['yes', 'Есть опыт'], ['no', 'Нет опыта']].map(([v, l]) => (
            <label key={v}><input type="radio" name="j-exp" value={v} checked={exp === v} onChange={() => setExp(v)} /><span>{l}</span></label>
          ))}
        </div>
      </div>

      {F({ id: 'j-direction', label: 'Интересующее направление *', err: errors.direction, hint: 'Выберите направление',
        children: (
          <select id="j-direction" className="select" value={f.direction} onChange={set('direction')} aria-invalid={!!errors.direction}>
            <option value="" disabled>Выберите направление</option>
            {join.directions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        ) })}

      {F({ id: 'j-about', label: 'Кратко о себе или ссылка на портфолио *', err: errors.about, hint: 'Напишите хотя бы пару предложений (от 10 символов)',
        children: <textarea id="j-about" className="textarea" placeholder="Что умеете, что уже делали, ссылка на работы" value={f.about} onChange={set('about')} aria-invalid={!!errors.about} /> })}

      <div className="field">
        <label className="f-lab" htmlFor="j-extra">Дополнительно <span className="opt">— по желанию</span></label>
        <textarea id="j-extra" className="textarea" style={{ minHeight: 84 }} placeholder="Сколько времени готовы уделять, вопросы" value={f.extra} onChange={set('extra')} />
      </div>

      <p className="form-consent">Отправляя заявку, вы соглашаетесь с <a href="/privacy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>.</p>
      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={state === 'sending'} aria-busy={state === 'sending'}>
        {state === 'sending' ? <><span className="spinner" aria-hidden="true" /> Отправляю…</> : <>Отправить заявку <IconArrow /></>}
      </button>
      {state === 'failed' && <LeadFallback title="Заявка в команду" rows={rows()} />}
    </form>
  );
}

export default function JoinCards() {
  const [open, setOpen] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const openForm = exp => { setOpen(exp); setFormKey(k => k + 1); };
  return (
    <>
      <Reveal stagger className="join-grid">
        {CARDS.map((c, i) => (
          <article key={c.exp} className="jcard">
            <span className="j-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="j-k">{c.k}</span>
            <h2>{c.title}</h2>
            <p>{c.text}</p>
            <p className="muted">{c.hint}</p>
            <button type="button" className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => openForm(c.exp)} aria-haspopup="dialog">
              Откликнуться <IconArrow />
            </button>
          </article>
        ))}
      </Reveal>
      <Modal open={!!open} onClose={() => setOpen(null)} labelledBy="joinTitle">
        {open && <JoinForm key={formKey} initialExp={open} />}
      </Modal>
    </>
  );
}
