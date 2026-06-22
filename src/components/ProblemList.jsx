// Difficulty badge colors
const DIFF_COLORS = {
  Easy:   'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Medium: 'bg-amber-100  text-amber-700  border border-amber-200',
  Hard:   'bg-red-100    text-red-700    border border-red-200',
};

export default function ProblemList({ problems, selectedId, onSelect }) {
  return (
    <aside className="w-72 min-w-[18rem] bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
        <h1 className="text-lg font-bold text-slate-800 tracking-tight">DSA Cracker</h1>
        <p className="text-xs text-slate-500 mt-0.5">TCS NQT · Step-by-step</p>
      </div>

      {/* Problem list */}
      <div className="flex-1 overflow-y-auto py-2">
        {problems.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors hover:bg-indigo-50
              ${selectedId === p.id ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={`text-sm font-semibold ${selectedId === p.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {p.icon} {p.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{p.source}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 whitespace-nowrap ${DIFF_COLORS[p.difficulty]}`}>
                {p.difficulty}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-1.5">
              {p.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>

            {/* Complexity badges */}
            <div className="flex gap-2 mt-1.5">
              <span className="text-[10px] text-slate-400">
                ⏱ {p.timeComplexity}
              </span>
              <span className="text-[10px] text-slate-400">
                📦 {p.spaceComplexity}
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
