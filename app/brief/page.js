import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import Quiz from '@/components/Quiz';
import { og } from '@/lib/seo';

export const metadata = {
  title: 'Обсудить проект',
  description: 'Ответьте на несколько вопросов о будущем сайте — тип, формат, сроки и бюджет. Заявка придёт напрямую Александру.',
  alternates: { canonical: '/brief' },
  openGraph: og('/brief'),
};

export default function BriefPage() {
  return (
    <section className="quiz-page">
      <div className="wrap">
        <div className="quiz-head">
          <Heading as="h1" className="h2" manual text="Несколько вопросов — и я пойму, *какой сайт* вам нужен" />
        </div>
        <Quiz />
      </div>
    </section>
  );
}
