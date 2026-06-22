export default function MetaphorCard({ metaphor }) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5">
      {/* Title row */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{metaphor.icon}</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Real-world analogy</p>
          <h3 className="text-base font-bold text-indigo-800">{metaphor.title}</h3>
        </div>
      </div>

      {/* Story */}
      <p className="text-sm text-slate-600 leading-relaxed mb-4">{metaphor.story}</p>

      {/* Visual breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {metaphor.visual.map((v, i) => (
          <div key={i} className="bg-white rounded-lg border border-indigo-100 p-3 text-center">
            <p className="text-xs font-mono font-bold text-indigo-600 mb-1">{v.label}</p>
            <p className="text-xs text-slate-500">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
