"use client";

import { useDogsChatProvider } from "./Provider";

const suggQuests = [
  "How can web3 help creators protect their digital ownership?",
  "Why do we need digital property rights?",
];

export const SuggestedQuestion = () => {
  const { handleSendUserMessage } = useDogsChatProvider();

  return (
    <div className="flex flex-wrap gap-2">
      {suggQuests.map((q, idx) => (
        <button
          onClick={() => handleSendUserMessage(q)}
          className="bg-light-yellow px-4 py-2 border-2 border-blue_1"
          key={idx}
        >
          <p className="text-sm">{q}</p>
        </button>
      ))}
    </div>
  );
};
