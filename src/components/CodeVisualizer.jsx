// CodeVisualizer — shows annotated code with:
//   • active line highlight (from current stepper step)
//   • inline time/space notes on each line
//   • loop annotations

export default function CodeVisualizer({ annotatedCode, activeLines = [], showAnnotations }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-slate-700">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-slate-400 ml-2">solution.py</span>
      </div>

      {/* Code lines */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {annotatedCode.map((line) => {
              const isActive = activeLines.includes(line.id);
              return (
                <tr
                  key={line.id}
                  className={`group transition-colors ${isActive ? 'bg-indigo-500/20' : 'hover:bg-white/5'}`}
                >
                  {/* Line number */}
                  <td className={`select-none text-right pr-4 pl-4 py-1 text-xs w-10 ${
                    isActive ? 'text-indigo-400 font-bold' : 'text-slate-600'
                  }`}>
                    {isActive ? '▶' : line.id + 1}
                  </td>

                  {/* Code */}
                  <td className="py-1 pr-4 w-full">
                    <span className={`whitespace-pre text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {line.code}
                    </span>

                    {/* Loop badge */}
                    {line.isLoop && (
                      <span className="ml-3 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded px-1.5 py-0.5">
                        ↺ loop
                      </span>
                    )}
                  </td>

                  {/* Inline annotations */}
                  {showAnnotations && (
                    <td className="py-1 pr-4 whitespace-nowrap">
                      <div className="flex gap-2 items-center justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] bg-sky-900/60 text-sky-300 border border-sky-700/50 rounded px-1.5 py-0.5">
                          ⏱ {line.timeNote}
                        </span>
                        <span className="text-[10px] bg-teal-900/60 text-teal-300 border border-teal-700/50 rounded px-1.5 py-0.5">
                          📦 {line.spaceNote}
                        </span>
                      </div>

                      {/* Loop note on loop lines */}
                      {line.isLoop && line.loopNote && (
                        <p className="text-[10px] text-amber-400/70 mt-0.5 text-right pr-1">
                          ↳ {line.loopNote}
                        </p>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
