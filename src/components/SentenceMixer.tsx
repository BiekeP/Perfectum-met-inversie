import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { EXERCISE_SENTENCES } from '../data/sentences';
import { speakDutch, sound } from '../utils/sound';

export const SentenceMixer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const rollNew = () => {
    setIsRolling(true);
    sound.playDiceRoll();

    setTimeout(() => {
      let nextIdx = Math.floor(Math.random() * EXERCISE_SENTENCES.length);
      if (nextIdx === currentIndex) {
        nextIdx = (currentIndex + 1) % EXERCISE_SENTENCES.length;
      }
      setCurrentIndex(nextIdx);
      setIsRevealed(false);
      setIsRolling(false);
      sound.playCardFlip();
    }, 400);
  };

  const item = EXERCISE_SENTENCES[currentIndex];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* Sober roll bar */}
      <div className="bg-slate-100 border border-slate-300 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
            Willekeurige Oefensessie · 20 Doelzinnen
          </span>
          <h2 className="text-base font-bold text-slate-900">
            Druk op Start voor een willekeurige zin
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Oefen willekeurige zinnen uit het curriculum van 20 zinnen.
          </p>
        </div>

        <button
          type="button"
          onClick={rollNew}
          disabled={isRolling}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <span>🎲</span>
          <span>{isRolling ? 'Bezig...' : 'Start'}</span>
        </button>
      </div>

      {/* The 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kaart 1: Tijd */}
        <div className="bg-white rounded-xl p-6 border border-slate-300 shadow-xs flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Kaart 1 · Tijd (Reststuk)
              </span>
              <span className="text-xs text-slate-500 font-mono">Positie 1</span>
            </div>
            <p className="text-xs text-slate-500 mt-4 mb-1">Begin de zin met:</p>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900">
              "{item.timeRest}"
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-3 border-t border-slate-100">
            Start met de tijdsaanduider. Gebruik <strong>inversie</strong> in het <strong>perfectum</strong>.
          </p>
        </div>

        {/* Kaart 2: Bouwstenen */}
        <div className="bg-white rounded-xl p-6 border border-slate-300 shadow-xs flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Kaart 2 · Bouwstenen
              </span>
              <span className="text-xs text-slate-500 font-mono">S · Verbum · O · P</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-500 font-medium">Subject</div>
                <div className="font-semibold text-slate-900 font-mono mt-0.5">{item.subject}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-500 font-medium">Verbum (infinitief)</div>
                <div className="font-semibold text-slate-900 font-mono mt-0.5">{item.verbInfinitive}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-500 font-medium">Object</div>
                <div className="font-semibold text-slate-900 mt-0.5">{item.object}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-500 font-medium">Plaats</div>
                <div className="font-semibold text-slate-900 mt-0.5">{item.place}</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-3 border-t border-slate-100">
            Opdracht: <strong>Vervoeg in het perfectum</strong> en volg de <strong>TOP-reststructuur</strong>.
          </p>
        </div>
      </div>

      {/* Oral Prompt & Control Sentence */}
      <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs">
        {!isRevealed ? (
          <div className="text-center py-6">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Spreek je zin mondeling uit in het perfectum!
            </h3>
            <p className="text-xs text-slate-600 mb-4 max-w-md mx-auto">
              Denk aan de volgorde: Tijd → Verbum 1 → Subject → Object → Plaats → Verbum 2.
            </p>
            <button
              type="button"
              onClick={() => {
                sound.playCardFlip();
                setIsRevealed(true);
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer"
            >
              Toon controlezin in het perfectum
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Controlezin · Het Perfectum met Inversie
              </span>
              <button
                type="button"
                onClick={() => speakDutch(item.fullSentence)}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded border border-slate-300 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Beluister</span>
              </button>
            </div>

            <div className="p-4 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 font-semibold text-base sm:text-lg leading-relaxed">
              {item.fullSentence}
            </div>

            {/* Analysis chips with Latin terminology */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div className="p-2 bg-white border border-slate-300 rounded-md">
                <span className="text-[10px] text-slate-500 font-bold block">1. Tijd</span>
                <span className="font-semibold text-slate-900">{item.timeRest}</span>
              </div>
              <div className="p-2 bg-white border border-slate-300 rounded-md">
                <span className="text-[10px] text-slate-500 font-bold block">2. Verbum 1</span>
                <span className="font-semibold text-slate-900 font-mono">{item.auxiliaryConjugated}</span>
              </div>
              <div className="p-2 bg-white border border-slate-300 rounded-md">
                <span className="text-[10px] text-slate-500 font-bold block">3. Subject</span>
                <span className="font-semibold text-slate-900">{item.subject}</span>
              </div>
              <div className="p-2 bg-white border border-slate-300 rounded-md">
                <span className="text-[10px] text-slate-500 font-bold block">4. Object</span>
                <span className="font-semibold text-slate-900">{item.object}</span>
              </div>
              <div className="p-2 bg-white border border-slate-300 rounded-md">
                <span className="text-[10px] text-slate-500 font-bold block">5. Plaats</span>
                <span className="font-semibold text-slate-900">{item.place}</span>
              </div>
              <div className="p-2 bg-white border border-slate-300 rounded-md">
                <span className="text-[10px] text-slate-500 font-bold block">6. Verbum 2</span>
                <span className="font-semibold text-slate-900 font-mono">{item.pastParticiple}</span>
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                type="button"
                onClick={rollNew}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg cursor-pointer"
              >
                Volgende willekeurige zin
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
