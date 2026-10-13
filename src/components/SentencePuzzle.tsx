import React, { useState, useEffect } from 'react';
import { CheckCircle2, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { ExerciseSentence } from '../data/sentences';
import { speakDutch, sound } from '../utils/sound';

interface SentencePuzzleProps {
  sentence: ExerciseSentence;
  onNext?: () => void;
}

interface TileItem {
  id: string;
  text: string;
  type: 'T' | 'V1' | 'S' | 'O' | 'P' | 'V2';
}

export const SentencePuzzle: React.FC<SentencePuzzleProps> = ({ sentence, onNext }) => {
  const correctTiles: TileItem[] = [
    { id: 'T', text: sentence.timeRest, type: 'T' },
    { id: 'V1', text: sentence.auxiliaryConjugated, type: 'V1' },
    { id: 'S', text: sentence.subject, type: 'S' },
    { id: 'O', text: sentence.object, type: 'O' },
    { id: 'P', text: sentence.place, type: 'P' },
    { id: 'V2', text: sentence.pastParticiple, type: 'V2' },
  ];

  const [availableTiles, setAvailableTiles] = useState<TileItem[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<TileItem[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const resetPuzzle = () => {
    const shuffled = [...correctTiles].sort(() => Math.random() - 0.5);
    setAvailableTiles(shuffled);
    setSelectedTiles([]);
    setIsCorrect(null);
  };

  useEffect(() => {
    resetPuzzle();
  }, [sentence.id]);

  const handleSelectTile = (tile: TileItem) => {
    sound.playCardFlip();
    setAvailableTiles(prev => prev.filter(t => t.id !== tile.id));
    const nextSelected = [...selectedTiles, tile];
    setSelectedTiles(nextSelected);

    if (nextSelected.length === correctTiles.length) {
      const correct = nextSelected.every((t, i) => t.id === correctTiles[i].id);
      setIsCorrect(correct);
      if (correct) {
        sound.playSuccess();
      }
    }
  };

  const handleRemoveTile = (tile: TileItem) => {
    setSelectedTiles(prev => prev.filter(t => t.id !== tile.id));
    setAvailableTiles(prev => [...prev, tile]);
    setIsCorrect(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Bouw de zin in het perfectum met inversie</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Klik op de bouwstenen in de juiste volgorde: <strong>Tijd → Verbum 1 → Subject → Object → Plaats → Verbum 2</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={resetPuzzle}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Opnieuw schudden</span>
        </button>
      </div>

      {/* Target Drop Zone */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Jouw zinsvolgorde:</span>
          <span className="font-mono text-slate-500 text-[11px]">
            {selectedTiles.length}/{correctTiles.length} bouwstenen
          </span>
        </div>

        <div className="min-h-[64px] p-2.5 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 flex flex-wrap items-center gap-2">
          {selectedTiles.length === 0 ? (
            <span className="text-xs text-indigo-400 italic">
              Klik hieronder op de eerste bouwsteen (start met de Tijd).
            </span>
          ) : (
            selectedTiles.map((tile, idx) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => handleRemoveTile(tile)}
                className="px-3 py-1.5 rounded-lg bg-white text-indigo-950 text-xs font-bold border border-indigo-300 hover:border-rose-400 transition-colors cursor-pointer shadow-xs"
                title="Klik om te verwijderen"
              >
                <span className="text-[10px] text-indigo-500 mr-1">[{idx + 1}]</span>
                <span>{tile.text}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Scrambled Tiles */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-slate-700">
          Beschikbare bouwstenen:
        </div>
        <div className="flex flex-wrap gap-2 min-h-[42px]">
          {availableTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => handleSelectTile(tile)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-indigo-50 active:bg-indigo-100 text-slate-900 hover:text-indigo-900 border border-slate-300 hover:border-indigo-400 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              {tile.text}
            </button>
          ))}
          {availableTiles.length === 0 && selectedTiles.length > 0 && (
            <span className="text-xs text-slate-500">
              Alle bouwstenen zijn geplaatst.
            </span>
          )}
        </div>
      </div>

      {/* Result feedback */}
      {isCorrect !== null && (
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <span className="text-base">❌</span>
            )}
            <div>
              <p className="text-xs font-bold">
                {isCorrect
                  ? 'Correct! De inversie in het perfectum en de TOP-volgorde kloppen precies.'
                  : 'Nog niet juist. Denk aan de volgorde: Tijd → Verbum 1 → Subject → Object → Plaats → Verbum 2.'}
              </p>
              {isCorrect && (
                <p className="text-xs text-emerald-800 mt-0.5 font-medium">
                  "{sentence.fullSentence}"
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {isCorrect && (
              <button
                type="button"
                onClick={() => speakDutch(sentence.fullSentence)}
                className="px-3 py-1.5 bg-white text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-300 hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Beluister</span>
              </button>
            )}

            {onNext && isCorrect && (
              <button
                type="button"
                onClick={onNext}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Volgende zin →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
