import Link from 'next/link';
import Heading from './Heading';
import Reveal from './Reveal';
import { IconArrow } from './Icons';

export default function CtaBand({ title, text }) {
  return (
    <Reveal className="cta-band">
      <div>
        <Heading className="h2" text={title} />
        <p>{text}</p>
      </div>
      <Link className="btn btn-primary" href="/brief">Обсудить проект <IconArrow /></Link>
    </Reveal>
  );
}
