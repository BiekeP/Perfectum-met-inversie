import React from 'react';

interface CardInfoProps {
  subject: string;
  verbInfinitive: string;
  object: string;
  place: string;
}

export const CardInfo: React.FC<CardInfoProps> = ({
  subject,
  verbInfinitive,
  object,
  place,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col justify-between min-h-[200px]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
            2
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Kaart 2 · Bouwstenen
          </span>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          Perfectum
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 my-3 text-xs">
        {/* Subject */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3">
          <div className="text-amber-800 font-semibold text-[11px] uppercase tracking-wider mb-0.5">
            Subject
          </div>
          <div className="text-base font-bold text-slate-900 font-mono">
            {subject}
          </div>
        </div>

        {/* Verbum */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3">
          <div className="text-rose-800 font-semibold text-[11px] uppercase tracking-wider mb-0.5">
            Verbum (infinitief)
          </div>
          <div className="text-base font-bold text-slate-900 font-mono">
            {verbInfinitive}
          </div>
        </div>

        {/* Object */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
          <div className="text-emerald-800 font-semibold text-[11px] uppercase tracking-wider mb-0.5">
            Object
          </div>
          <div className="text-sm font-bold text-slate-900">
            {object}
          </div>
        </div>

        {/* Plaats / Rest */}
        <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3">
          <div className="text-sky-800 font-semibold text-[11px] uppercase tracking-wider mb-0.5">
            Plaats / Rest
          </div>
          <div className="text-sm font-bold text-slate-900">
            {place}
          </div>
        </div>
      </div>
    </div>
  );
};
