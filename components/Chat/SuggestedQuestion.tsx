'use client';

import { useSearchParams } from 'next/navigation';
import { useDogsChatProvider } from './Provider';

const suggQuests = [
  '¿Cómo están los perros?',
  '¿Cuál de las obras de Mises debería leer primero?',
];

export const SuggestedQuestion = () => {
  const { handleSendUserMessage } = useDogsChatProvider();

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  return (
    <div className="flex flex-wrap gap-2">
      {suggQuests.map((q, idx) => (
        <button
          onClick={() =>
            handleSendUserMessage({
              query: q,
              session_id: sessionId as string,
            })
          }
          className="bg-light-yellow px-4 py-2 border-2 border-blue_1 hover:bg-light-yellow/80 transition-colors duration-200 text-sm md:text-base"
          key={idx}
        >
          <p>{q}</p>
        </button>
      ))}
    </div>
  );
};
