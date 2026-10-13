import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { EXERCISE_SENTENCES, ExerciseSentence } from './data/sentences';
import { Header } from './components/Header';
import { DiceVisual } from './components/DiceVisual';
import { CardTime } from './components/CardTime';
import { CardInfo } from './components/CardInfo';
import { ControlSentenceBreakdown } from './components/ControlSentenceBreakdown';
import { SentencePuzzle } from './components/SentencePuzzle';
import { SentenceMixer } from './components/SentenceMixer';
import { sound } from './utils/sound';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'sentences' | 'mixer' | 'puzzle'>('sentences');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [diceValues, setDiceValues] = useState<[number, number]>([3, 5]);
  const [isRolling, setIsRolling] = useState(false);
  const [revealedMap, setRevealedMap] = useState<Record<number, boolean>>({});
  const [statusMap, setStatusMap] = useState<Record<number, 'perfect' | 'almost' | 'retry'>>({});

  useEffect(() => {
    try {
      const savedStatus = localStorage.getItem('nt2_top_status');
      if (savedStatus) {
        setStatusMap(JSON.parse(savedStatus));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveStatus = (id: number, status: 'perfect' | 'almost' | 'retry') => {
    const updated = { ...statusMap, [id]: status };
    setStatusMap(updated);
    try {
      localStorage.setItem('nt2_top_status', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleRollDice = () => {
    setIsRolling(true);
    sound.playDiceRoll();

    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDiceValues([d1, d2]);

      setCurrentIndex((prev) => (prev + 1) % EXERCISE_SENTENCES.length);
      setIsRolling(false);
      sound.playCardFlip();
    }, 350);
  };

  const handleSelectSentence = (idx: number) => {
    if (idx === currentIndex) return;
    sound.playCardFlip();
    setCurrentIndex(idx);
  };

  const handleNext = () => {
    if (currentIndex < EXERCISE_SENTENCES.length - 1) {
      sound.playCardFlip();
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.playCardFlip();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Wil je de resultaten van de 20 oefenzinnen wissen?')) {
      setStatusMap({});
      setRevealedMap({});
      try {
        localStorage.removeItem('nt2_top_status');
      } catch {
        // ignore
      }
    }
  };

  const currentSentence: ExerciseSentence = EXERCISE_SENTENCES[currentIndex];
  const isCurrentRevealed = !!revealedMap[currentSentence.id];
  const completedCount = Object.values(statusMap).filter((s) => s === 'perfect').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        completedCount={completedCount}
        totalCount={EXERCISE_SENTENCES.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Main Tab: 20 Core Exercises */}
        {currentTab === 'sentences' && (
          <div className="space-y-5">
            {/* Context Instruction Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                  Threshold 3 naar B1 · Perfectum met Inversie
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Opdracht: Maak een zin in het perfectum met inversie
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Druk op <strong>Start</strong> om de kaarten te zien en maak de zin <strong>mondeling</strong>.
                </p>
              </div>

              {/* Exact Formula Box */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 shrink-0 text-xs">
                <div className="font-bold text-indigo-900 text-[11px] uppercase tracking-wider mb-0.5">
                  Vaste TOP-volgorde:
                </div>
                <div className="font-mono font-bold text-xs text-indigo-700">
                  [Tijd] [V1] [Subject] [Object] [Plaats] [V2]
                </div>
              </div>
            </div>

            {/* Interactive Start Trigger */}
            <DiceVisual
              value1={diceValues[0]}
              value2={diceValues[1]}
              isRolling={isRolling}
              onRoll={handleRollDice}
              label="Start"
            />

            {/* Exercise Selector Strip */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Oefenzin {currentIndex + 1} van {EXERCISE_SENTENCES.length}
                  </span>
                  {statusMap[currentSentence.id] === 'perfect' && (
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Juist
                    </span>
                  )}
                  {statusMap[currentSentence.id] === 'almost' && (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-600" /> Bijna
                    </span>
                  )}
                </div>

                {/* Prev / Next controls */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-700 transition-colors cursor-pointer"
                    title="Vorige zin"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono font-bold text-slate-800 px-2 tabular-nums">
                    {currentIndex + 1} / {EXERCISE_SENTENCES.length}
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentIndex === EXERCISE_SENTENCES.length - 1}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-700 transition-colors cursor-pointer"
                    title="Volgende zin"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 20 Sentence direct-jump buttons */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {EXERCISE_SENTENCES.map((s, idx) => {
                  const status = statusMap[s.id];
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectSentence(idx)}
                      className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center relative cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-200'
                          : status === 'perfect'
                          ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
                          : status === 'almost'
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                          : status === 'retry'
                          ? 'bg-rose-100 text-rose-900 hover:bg-rose-200 border border-rose-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                      title={`Zin ${s.id}`}
                    >
                      <span>{s.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* The 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardTime timeRest={currentSentence.timeRest} />
              <CardInfo
                subject={currentSentence.subject}
                verbInfinitive={currentSentence.verbInfinitive}
                object={currentSentence.object}
                place={currentSentence.place}
              />
            </div>

            {/* Oral prompt & Control Sentence breakdown */}
            <ControlSentenceBreakdown
              sentence={currentSentence}
              isRevealed={isCurrentRevealed}
              onReveal={() => {
                setRevealedMap((prev) => ({ ...prev, [currentSentence.id]: true }));
              }}
              onSelfAssess={(status) => {
                saveStatus(currentSentence.id, status);
              }}
              currentStatus={statusMap[currentSentence.id]}
            />

            {/* Secondary actions & interactive puzzle shortcut */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setCurrentTab('puzzle')}
                className="flex items-center gap-1.5 font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Puzzelmodus: Bouw deze zin met bouwstenen</span>
              </button>

              <button
                type="button"
                onClick={handleResetProgress}
                className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Wis resultaten
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Puzzle */}
        {currentTab === 'puzzle' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Woordvolgorde Puzzel · Zin {currentIndex + 1} van {EXERCISE_SENTENCES.length}
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Bouw de zin in het perfectum met inversie
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCurrentTab('sentences')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-xs cursor-pointer"
              >
                ← Terug naar mondelinge kaarten
              </button>
            </div>

            <SentencePuzzle
              sentence={currentSentence}
              onNext={() => {
                if (currentIndex < EXERCISE_SENTENCES.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            />
          </div>
        )}

        {/* Tab 3: Free Mixer Sandbox */}
        {currentTab === 'mixer' && <SentenceMixer />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">Inversie in het Perfectum</span>
            <span className="mx-2">·</span>
            <span>TOP-reststructuur (Tijd · Object · Plaats)</span>
          </div>
          <div>
            <span>Threshold 3 naar B1 · 20 Oefenzinnen</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
