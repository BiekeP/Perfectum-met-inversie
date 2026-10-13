import React from 'react';
import { Dices, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentTab: 'sentences' | 'mixer' | 'puzzle';
  onSelectTab: (tab: 'sentences' | 'mixer' | 'puzzle') => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  completedCount,
  totalCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            TOP
          </div>
          <span className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Inversie in het Perfectum
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 shrink-0 uppercase tracking-wider">
          <button
            onClick={() => onSelectTab('sentences')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentTab === 'sentences'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>20 Oefenzinnen</span>
          </button>

          <button
            onClick={() => onSelectTab('mixer')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentTab === 'mixer'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Willekeurige Modus</span>
          </button>

          <button
            onClick={() => onSelectTab('puzzle')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 cursor-pointer ${
              currentTab === 'puzzle'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bouw de Zin</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action / Status Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Voltooid:</span>
            <span className="font-bold text-slate-900 font-mono tabular-nums">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile nav subrow */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center justify-around text-xs font-medium text-slate-600 bg-slate-50">
        <button
          onClick={() => onSelectTab('sentences')}
          className={`px-3 py-1 rounded-md ${currentTab === 'sentences' ? 'bg-indigo-600 text-white font-bold' : ''}`}
        >
          20 Zinnen
        </button>
        <button
          onClick={() => onSelectTab('mixer')}
          className={`px-3 py-1 rounded-md ${currentTab === 'mixer' ? 'bg-indigo-600 text-white font-bold' : ''}`}
        >
          Willekeurig
        </button>
        <button
          onClick={() => onSelectTab('puzzle')}
          className={`px-3 py-1 rounded-md ${currentTab === 'puzzle' ? 'bg-indigo-600 text-white font-bold' : ''}`}
        >
          Bouw Zin
        </button>
      </div>
    </header>
  );
};
