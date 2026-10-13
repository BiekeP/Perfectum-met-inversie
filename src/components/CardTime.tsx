import React from 'react';

interface CardTimeProps {
  timeRest: string;
}

export const CardTime: React.FC<CardTimeProps> = ({ timeRest }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md flex flex-col justify-center min-h-[200px] border border-indigo-500">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-6 h-6 rounded-md bg-white/20 text-white flex items-center justify-center text-xs font-bold">
          1
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">
          Kaart 1 · Tijd
        </span>
      </div>

      <div>
        <span className="text-xs font-medium text-indigo-200 block mb-1">
          Begin met:
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          "{timeRest}"
        </div>
      </div>
    </div>
  );
};
