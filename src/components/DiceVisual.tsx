import React from 'react';

interface DiceVisualProps {
  value1: number;
  value2: number;
  isRolling: boolean;
  onRoll: () => void;
  label?: string;
}

export const DiceVisual: React.FC<DiceVisualProps> = ({
  value1,
  value2,
  isRolling,
  onRoll,
  label = "Start",
}) => {
  const renderDots = (val: number) => {
    const dotPositions: Record<number, string[]> = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'mid-left', 'mid-right', 'bottom-left', 'bottom-right'],
    };

    const activeDots = dotPositions[val] || dotPositions[1];

    const getPosClass = (pos: string) => {
      switch (pos) {
        case 'top-left': return 'top-2 left-2';
        case 'top-right': return 'top-2 right-2';
        case 'mid-left': return 'top-1/2 -translate-y-1/2 left-2';
        case 'mid-right': return 'top-1/2 -translate-y-1/2 right-2';
        case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
        case 'bottom-left': return 'bottom-2 left-2';
        case 'bottom-right': return 'bottom-2 right-2';
        default: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      }
    };

    return (
      <div className="relative w-10 h-10 bg-white rounded-lg shadow-xs border border-slate-300 p-1 select-none">
        {activeDots.map((pos, idx) => (
          <span
            key={idx}
            className={`absolute w-2 h-2 rounded-full bg-slate-800 ${getPosClass(pos)}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-100 border border-slate-300 rounded-xl">
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 transition-transform duration-300 ${
            isRolling ? 'rotate-6 scale-105' : ''
          }`}
        >
          <div className={isRolling ? 'animate-bounce' : ''}>
            {renderDots(value1)}
          </div>
          <div className={isRolling ? 'animate-bounce delay-75' : ''}>
            {renderDots(value2)}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Druk op Start om twee kaarten te zien
          </h2>
          <p className="text-xs text-slate-600">
            Formuleer daarna je zin mondeling in het perfectum met inversie.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRoll}
        disabled={isRolling}
        className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
      >
        <span>🎲</span>
        <span>{isRolling ? 'Bezig...' : label}</span>
      </button>
    </div>
  );
};
