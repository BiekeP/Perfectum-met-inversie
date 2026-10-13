import React, { useState } from 'react';
import { Volume2, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { ExerciseSentence } from '../data/sentences';
import { speakDutch, sound } from '../utils/sound';

interface ControlSentenceBreakdownProps {
  sentence: ExerciseSentence;
  isRevealed: boolean;
  onReveal: () => void;
  onSelfAssess: (status: 'perfect' | 'almost' | 'retry') => void;
  currentStatus?: 'perfect' | 'almost' | 'retry' | null;
}

export const ControlSentenceBreakdown: React.FC<ControlSentenceBreakdownProps> = ({
  sentence,
  isRevealed,
  onReveal,
  onSelfAssess,
  currentStatus,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.9);

  const handlePlayAudio = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await speakDutch(sentence.fullSentence, audioSpeed);
    setIsPlayingAudio(false);
  };

  const handleAssess = (status: 'perfect' | 'almost' | 'retry') => {
    if (status === 'perfect') {
      sound.playSuccess();
    }
    onSelfAssess(status);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {!isRevealed ? (
        <div className="text-center py-6 px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-3">
            <Volume2 className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
            Maak je zin eerst mondeling in het perfectum!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-5 leading-relaxed">
            Spreek de zin luidop uit met <strong>inversie</strong> en let op de <strong>TOP-volgorde</strong>.
          </p>

          <button
            type="button"
            onClick={() => {
              sound.playCardFlip();
              onReveal();
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Toon de controlezin</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block mb-1">
                Controlezin · Het Perfectum met Inversie
              </span>
              <p className="text-xs text-slate-500">
                Vergelijk jouw mondelinge zin met het model:
              </p>
            </div>

            {/* Audio controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAudioSpeed(prev => (prev === 0.9 ? 0.75 : 0.9))}
                className="text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                title="Wissel audio tempo"
              >
                Tempo: {audioSpeed === 0.9 ? '1.0x' : '0.75x'}
              </button>

              <button
                type="button"
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg border border-indigo-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse text-indigo-600' : ''}`} />
                <span>{isPlayingAudio ? 'Spreekt...' : 'Beluister'}</span>
              </button>
            </div>
          </div>

          {/* Full Sentence Display */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-xl shadow-xs">
            <p className="text-lg sm:text-xl font-semibold leading-relaxed">
              {sentence.fullSentence}
            </p>
          </div>

          {/* TOP Structural Formula Breakdown with attractive colored badges */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-700">
                Structuuranalyse
              </span>
              <span className="font-mono text-indigo-700 font-bold text-xs">
                Tijd → V1 → Subject → Object → Plaats → V2
              </span>
            </div>

            {/* The 6 grammatical slots */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {/* Positie 1: Tijd */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2.5">
                <div className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  1. Tijd (T)
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 break-words">
                  {sentence.timeRest}
                </div>
              </div>

              {/* Positie 2: Verbum 1 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
                <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  2. Verbum 1 (V1)
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 font-mono">
                  {sentence.auxiliaryConjugated}
                </div>
              </div>

              {/* Positie 3: Subject */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  3. Subject (S)
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 font-mono">
                  {sentence.subject}
                </div>
              </div>

              {/* Positie 4: Object */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
                <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  4. Object (O)
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 break-words">
                  {sentence.object}
                </div>
              </div>

              {/* Positie 5: Plaats / Rest */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-2.5">
                <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                  5. Plaats (P) / Rest
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 break-words">
                  {sentence.place}
                </div>
              </div>

              {/* Positie 6: Verbum 2 */}
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5">
                <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                  6. Verbum 2 (V2)
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 font-mono">
                  {sentence.pastParticiple}
                </div>
              </div>
            </div>
          </div>

          {/* Self Assessment */}
          <div className="pt-1">
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Hoe ging jouw mondelinge zin?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleAssess('perfect')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  currentStatus === 'perfect'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Helemaal juist</span>
              </button>

              <button
                type="button"
                onClick={() => handleAssess('almost')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  currentStatus === 'almost'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Bijna (kleine fout)</span>
              </button>

              <button
                type="button"
                onClick={() => handleAssess('retry')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  currentStatus === 'retry'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white hover:bg-rose-50 text-rose-800 border-rose-300'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Nog eens oefenen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
