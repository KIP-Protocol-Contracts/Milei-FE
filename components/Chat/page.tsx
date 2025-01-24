'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lucas from '@/public/images/lucas.png';
import Milton from '@/public/images/milton.png';
import Murray from '@/public/images/murray.png';
import Milai from '@/public/images/Javier Milai.png';
import { BotMessage, UserMessage } from './Message';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SuggestedQuestion } from './SuggestedQuestion';
import { useDogsChatProvider } from './Provider';
import { Header } from './Header';
import { StaticImageData } from 'next/image';
import { v4 as uuidv4 } from 'uuid';

const bots = (name: string): StaticImageData | undefined => {
  switch (name) {
    case 'lucas':
      return Lucas;
    case 'milton':
      return Milton;
    case 'murray':
      return Murray;
    case 'milai':
      return Milai;
  }
};

const bgBots = (name: string): string | undefined => {
  switch (name) {
    case 'lucas':
      return 'bg-mil_orange';
    case 'milton':
      return 'bg-blue_1';
    case 'murray':
      return 'bg-background';
    case 'milai':
      return 'bg-mil_orange';
  }
};

export function ChatPage() {
  const {
    messages,
    handleClearMessages,
    userMsg,
    handleSendUserMessage,
    setUserMsg,
    answerStream,
    answerLoading,
  } = useDogsChatProvider();
  const { id } = useParams();

  const router = useRouter();

  const searchParams = useSearchParams();

  const sessionId = searchParams.get('sessionId');

  const [agent, setAgent] = useState<string>('');

  useEffect(() => {
    if (typeof id === 'string') {
      setAgent(id === 'milai' ? 'milai' : id);
    } else {
      setAgent('milai');
    }
  }, [id]);

  useEffect(() => {
    handleSessionId();
  }, []);

  const handleSessionId = () => {
    if (sessionId) return;
    router.replace(`/chat/${id}?sessionId=${uuidv4()}`);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, answerStream]);

  return (
    <div className="h-screen p-10">
      <div className="flex flex-col h-full border-2 border-blue_1 bg-background shadow-md shadow-mil_orange">
        <Header name={id as string} />
        {id === 'milai' && (
          <h1 className="font-bold text-3xl p-3">Pregunta al profesor Milai</h1>
        )}
        {id !== 'milai' && (
          <h1 className="font-bold text-3xl p-3">Chat with {id}</h1>
        )}
        <div
          className="flex flex-col flex-grow overflow-y-auto py-4 gap-4"
          ref={containerRef}
        >
          {messages.map((msg, idx) => {
            if (msg.sender === 'user') {
              return (
                <div className="flex flex-none flex-row-reverse px-3" key={idx}>
                  <UserMessage msg={msg.msg} />
                </div>
              );
            }
            return (
              <div key={idx} className="px-3">
                {agent && (
                  <BotMessage
                    msg={msg.msg}
                    name={agent}
                    pfp={bots(agent) as StaticImageData}
                    bgColor={bgBots(agent)}
                  />
                )}
              </div>
            );
          })}
          <div className="px-3">
            <BotMessage
              msg={answerStream}
              name={agent}
              pfp={bots(agent) as StaticImageData}
              bgColor={bgBots(agent)}
            />
          </div>
        </div>

        <div className="px-3 pt-3">
          <SuggestedQuestion />
        </div>

        <div className="flex items-center gap-4 w-full p-3">
          <button onClick={handleClearMessages} className="btn btn-square">
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3438 13.4063H5.15625C4.88275 13.4063 4.62044 13.2976 4.42705 13.1042C4.23365 12.9108 4.125 12.6485 4.125 12.375V6.18752C4.125 5.91402 4.23365 5.65172 4.42705 5.45832C4.62044 5.26492 4.88275 5.15627 5.15625 5.15627C5.42975 5.15627 5.69206 5.26492 5.88545 5.45832C6.07885 5.65172 6.1875 5.91402 6.1875 6.18752V9.88585L8.0734 7.99995C10.3734 5.68841 13.497 4.38461 16.7578 4.3751H16.8261C20.0592 4.36677 23.1654 5.6325 25.4719 7.89811C25.6602 8.09078 25.7657 8.34949 25.7657 8.61891C25.7657 8.88833 25.6603 9.14705 25.472 9.33974C25.2836 9.53242 25.0274 9.64376 24.7581 9.64994C24.4887 9.65612 24.2276 9.55665 24.0307 9.3728C22.1082 7.48571 19.5201 6.43129 16.8261 6.4376H16.7681C14.051 6.44597 11.4483 7.53222 9.53133 9.45788L7.64543 11.3438H11.3438C11.6173 11.3438 11.8796 11.4524 12.073 11.6458C12.2664 11.8392 12.375 12.1015 12.375 12.375C12.375 12.6485 12.2664 12.9108 12.073 13.1042C11.8796 13.2976 11.6173 13.4063 11.3438 13.4063ZM27.8438 19.5938H21.6562C21.3827 19.5938 21.1204 19.7024 20.927 19.8958C20.7336 20.0892 20.625 20.3515 20.625 20.625C20.625 20.8985 20.7336 21.1608 20.927 21.3542C21.1204 21.5476 21.3827 21.6563 21.6562 21.6563H25.3546L23.4687 23.5422C21.5521 25.4675 18.9498 26.5537 16.2332 26.5624H16.1752C13.4812 26.5688 10.8931 25.5143 8.97059 23.6273C8.87453 23.529 8.75981 23.4509 8.63316 23.3976C8.50651 23.3443 8.37048 23.3168 8.23307 23.3169C8.09566 23.3169 7.95964 23.3443 7.83299 23.3976C7.70634 23.451 7.59163 23.5291 7.49559 23.6273C7.39955 23.7256 7.32412 23.8421 7.27372 23.9699C7.22333 24.0978 7.199 24.2344 7.20215 24.3718C7.2053 24.5091 7.23587 24.6445 7.29207 24.7699C7.34827 24.8953 7.42897 25.0082 7.52941 25.1019C9.83589 27.3676 12.9421 28.6333 16.1752 28.6249H16.2422C19.5026 28.6151 22.6257 27.3113 24.9253 25.0001L26.8125 23.1142V26.8125C26.8125 27.086 26.9211 27.3483 27.1145 27.5417C27.3079 27.7351 27.5702 27.8438 27.8438 27.8438C28.1173 27.8438 28.3796 27.7351 28.573 27.5417C28.7664 27.3483 28.875 27.086 28.875 26.8125V20.625C28.875 20.3515 28.7664 20.0892 28.573 19.8958C28.3796 19.7024 28.1173 19.5938 27.8438 19.5938Z"
                fill="#206DB0"
              />
            </svg>
          </button>
          <div className="w-full border-2 border-blue_1 p-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="grow bg-transparent border-none outline-none"
                placeholder="Pregúntame cualquier cosa..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userMsg !== '') {
                    handleSendUserMessage({
                      query: userMsg,
                      session_id: sessionId as string,
                    });
                  }
                }}
                disabled={answerLoading}
              />
              <button
                onClick={() =>
                  handleSendUserMessage({
                    query: userMsg,
                    session_id: sessionId as string,
                  })
                }
                disabled={userMsg === '' || answerLoading}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3112 2.68876C21.1226 2.50025 20.8871 2.36544 20.629 2.29821C20.371 2.23098 20.0997 2.23376 19.843 2.30626H19.829L1.83461 7.76625C1.54248 7.85045 1.28283 8.02142 1.09007 8.25651C0.897302 8.49161 0.780525 8.77973 0.75521 9.08269C0.729895 9.38565 0.797238 9.68916 0.948314 9.95298C1.09939 10.2168 1.32707 10.4285 1.60117 10.56L9.56242 14.4375L13.4343 22.3941C13.5547 22.6511 13.7462 22.8682 13.9861 23.0199C14.226 23.1716 14.5042 23.2514 14.788 23.25C14.8312 23.25 14.8743 23.2481 14.9174 23.2444C15.2201 23.2199 15.5081 23.1034 15.7427 22.9105C15.9773 22.7176 16.1473 22.4576 16.2299 22.1653L21.6862 4.17094C21.6862 4.16626 21.6862 4.16157 21.6862 4.15688C21.7596 3.90091 21.7636 3.63 21.6977 3.37199C21.6318 3.11397 21.4984 2.87815 21.3112 2.68876ZM14.7965 21.7359L14.7918 21.7491V21.7425L11.0362 14.0269L15.5362 9.52688C15.6709 9.38508 15.7449 9.19627 15.7424 9.0007C15.7399 8.80513 15.6611 8.61827 15.5228 8.47997C15.3845 8.34167 15.1976 8.26287 15.002 8.26036C14.8065 8.25786 14.6177 8.33185 14.4759 8.46657L9.97586 12.9666L2.25742 9.21094H2.25086H2.26399L20.2499 3.75001L14.7965 21.7359Z"
                    fill="#206DB0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
