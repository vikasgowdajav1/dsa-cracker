// Side panel showing time/space complexity state at the current step

export default function ComplexityPanel({ problem, currentStep, totalSteps }) {
  const step = problem.steps[currentStep] || problem.steps[problem.steps.length - 1];
  const progress = totalSteps > 1 ? currentStep / (totalSteps - 1) : 1;

  // Determine color for overall complexity
  const tColor = problem.timeComplexity.startsWith('O(1)') ? 'text-emerald-600' :
                 problem.timeComplexity.startsWith('O(n)') ? 'text-amber-600' :
                 problem.timeComplexity.startsWith('O(log') ? 'text-sky-600' : 'text-rose-600';

  const sColor = problem.spaceComplexity === 'O(1)' ? 'text-emerald-600' : 'text-amber-600';

  return (
    <aside className="w-64 min-w-[16rem] bg-slate-900 text-slate-100 flex flex-col p-4 gap-5 overflow-y-auto">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Complexity Tracker</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 mb-1">Time</p>
            <p className={`text-sm font-bold font-mono ${tColor}`}>{problem.timeComplexity}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 mb-1">Space</p>
            <p className={`text-sm font-bold font-mono ${sColor}`}>{problem.spaceComplexity}</p>
          </div>
        </div>
      </div>

      {/* Operations counter */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Operations so far</p>
          <p className="text-xs font-mono text-indigo-400">{step.timeOps}</p>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1.5">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 mt-1">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>

      {/* Variables in memory */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Memory / Variables</p>
        <div className="space-y-1">
          {step.spaceVars.map((v) => (
            <div key={v} className="flex items-center gap-2 bg-slate-800 rounded px-2 py-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
              <span className="text-xs font-mono text-slate-200">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-2">
          {step.spaceVars.length} variable{step.spaceVars.length !== 1 ? 's' : ''} in memory
        </p>
      </div>

      {/* Variable values */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Current Values</p>
        <div className="space-y-1">
          {Object.entries(step.vars).map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-2 bg-slate-800 rounded px-2 py-1.5">
              <span className="text-xs font-mono text-amber-400">{k}</span>
              <span className="text-xs font-mono text-slate-300 text-right break-all max-w-[7rem]">
                {Array.isArray(v) ? `[${v.join(',')}]` : String(v)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Space note */}
      <div className="bg-slate-800 rounded-lg p-3">
        <p className="text-[10px] font-semibold text-slate-400 mb-1">Why this space?</p>
        <p className="text-xs text-slate-400 leading-relaxed">
          {problem.spaceComplexity === 'O(1)'
            ? 'Only a fixed number of variables — doesn\'t grow with n. Pure O(1) extra space.'
            : `Extra space grows proportionally to input. See variables above.`}
        </p>
      </div>
    </aside>
  );
}
