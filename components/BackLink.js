'use client';
/* Кнопка «Назад» — возвращает в историю браузера, а если истории нет,
   ведёт на главную. */
import { useRouter } from 'next/navigation';

export default function BackLink({ className = 'btn btn-ghost', children }) {
  const router = useRouter();
  const back = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) router.back();
    else router.push('/');
  };
  return <button type="button" className={className} onClick={back}>{children}</button>;
}
