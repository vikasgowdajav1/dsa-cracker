// StepStepper — controls + variable watch + current step description

export default function StepStepper({ problem, currentStep, onStep, onPlay, isPlaying }) {
  const step = problem.steps[currentStep];
  const total = problem.steps.length;
  const isFirst = currentStep === 0;
  const isLast  = currentStep === total - 1;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      {/* Step description */}
      <div className="px-4 py-3 bg-slate-700/50 border-b border-slate-700">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white font-bold">
            {currentStep + 1}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{step.desc}</p>
        </div>
      </div>

      {/* Current variable values */}
      <div className="px-4 py-3 border-b border-slate-700">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
          Variable State
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(step.vars).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5 bg-slate-900 rounded-lg px-2.5 py-1.5 border border-slate-700">
              <span className="text-xs font-mono text-amber-400">{k}</span>
              <span className="text-slate-500 text-xs">=</span>
              <span className="text-xs font-mono text-emerald-400 max-w-[12rem] truncate">
                {Array.isArray(v)
                  ? (
                    <span>
                      [
                      {v.map((val, idx) => (
                        <span key={idx}>
                          <span className={val === 0 ? 'text-slate-500' : 'text-emerald-400'}>{val}</span>
                          {idx < v.length - 1 ? <span className="text-slate-600">,</span> : null}
                        </span>
                      ))}
                      ]
                    </span>
                  )
                  : String(v)
                }
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Prev / Next / Play */}
        <div className="flex items-center gap-2">
          <button
            disabled={isFirst}
            onClick={() => onStep(-1)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>

          <button
            onClick={onPlay}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isPlaying ? '⏹ Stop' : '▶ Play'}
          </button>

          <button
            disabled={isLast}
            onClick={() => onStep(1)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1">
          {problem.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => onStep(i - currentStep)}
              className={`rounded-full transition-all ${
                i === currentStep
                  ? 'w-4 h-2 bg-indigo-500'
                  : i < currentStep
                    ? 'w-2 h-2 bg-slate-500'
                    : 'w-2 h-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Step counter */}
        <span className="text-[11px] text-slate-500 font-mono">
          {currentStep + 1} / {total}
        </span>
      </div>
    </div>
  );
}
