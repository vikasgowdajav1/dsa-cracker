const PHASE_COLORS = {
  Observe:    'bg-sky-100    text-sky-700    border-sky-200',
  'Key Insight': 'bg-violet-100 text-violet-700 border-violet-200',
  'Loop Construction': 'bg-amber-100  text-amber-700  border-amber-200',
  Fill:       'bg-teal-100   text-teal-700   border-teal-200',
  Complexity: 'bg-rose-100   text-rose-700   border-rose-200',
};

export default function BreakdownGuide({ breakdown }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
        How to crack this problem
      </h3>
      <div className="space-y-3">
        {breakdown.map((step) => {
          const phaseClass = PHASE_COLORS[step.phase] || 'bg-slate-100 text-slate-600 border-slate-200';
          return (
            <div key={step.step} className="flex gap-3">
              {/* Step number */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                {step.step}
              </div>

              {/* Content */}
              <div className="flex-1 bg-white border border-slate-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${phaseClass}`}>
                    {step.phase}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{step.title}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
