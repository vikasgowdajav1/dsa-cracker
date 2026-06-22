import { useState } from 'react';

// ─── Colour maps ──────────────────────────────────────────────────────────────
const BOX_C = {
  blue:   'bg-blue-100   border-blue-400   text-blue-900',
  gray:   'bg-gray-100   border-gray-300   text-gray-400   italic',
  green:  'bg-emerald-100 border-emerald-400 text-emerald-900',
  red:    'bg-red-100    border-red-400    text-red-900',
  orange: 'bg-orange-100 border-orange-400 text-orange-900',
  purple: 'bg-purple-100 border-purple-400 text-purple-900',
  yellow: 'bg-yellow-100 border-yellow-400 text-yellow-900',
  active: 'bg-indigo-500 border-indigo-700 text-white',
  sky:    'bg-sky-100    border-sky-400    text-sky-900',
};
const PTR_C = {
  violet: 'text-violet-600',
  amber:  'text-amber-600',
  green:  'text-emerald-600',
  red:    'text-red-600',
  blue:   'text-blue-600',
  indigo: 'text-indigo-600',
};

// ─── Box primitive ────────────────────────────────────────────────────────────
function Box({ item, size = 'md' }) {
  const s = size === 'sm' ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm';
  return (
    <div className={`${s} border-2 rounded-lg flex flex-col items-center justify-center font-bold transition-all ${BOX_C[item.c] || BOX_C.blue}`}>
      <span>{item.v}</span>
      {item.sub && <span className="text-[8px] leading-none opacity-60">{item.sub}</span>}
    </div>
  );
}

// ─── Visual: Array with optional pointers ────────────────────────────────────
function ArrayViz({ v }) {
  const { items = [], pointers = [], showIndex } = v;
  const abovePointers = pointers.filter(p => p.pos === 'above');
  const belowPointers = pointers.filter(p => !p.pos || p.pos === 'below');

  return (
    <div className="flex flex-col items-center gap-1 overflow-x-auto py-1 w-full">
      {/* Names above */}
      {abovePointers.length > 0 && (
        <div className="flex gap-1">
          {items.map((_, i) => {
            const p = abovePointers.find(p => p.idx === i);
            return <div key={i} className="w-11 text-center text-xs font-bold" style={{ minWidth: 44 }}>{p ? <span className={PTR_C[p.c] || 'text-violet-600'}>{p.name}</span> : null}</div>;
          })}
        </div>
      )}
      {abovePointers.length > 0 && (
        <div className="flex gap-1">
          {items.map((_, i) => {
            const p = abovePointers.find(p => p.idx === i);
            return <div key={i} className="w-11 text-center text-xs" style={{ minWidth: 44 }}>{p ? <span className={PTR_C[p.c] || 'text-violet-600'}>▼</span> : null}</div>;
          })}
        </div>
      )}

      {/* Boxes row */}
      <div className="flex gap-1">
        {items.map((item, i) => <Box key={i} item={item} />)}
      </div>

      {/* Arrows below */}
      {belowPointers.length > 0 && (
        <div className="flex gap-1">
          {items.map((_, i) => {
            const p = belowPointers.find(p => p.idx === i);
            return <div key={i} className="w-11 text-center text-xs" style={{ minWidth: 44 }}>{p ? <span className={PTR_C[p.c] || 'text-violet-600'}>▲</span> : null}</div>;
          })}
        </div>
      )}
      {belowPointers.length > 0 && (
        <div className="flex gap-1">
          {items.map((_, i) => {
            const p = belowPointers.find(p => p.idx === i);
            return <div key={i} className="w-11 text-center text-xs font-bold" style={{ minWidth: 44 }}>{p ? <span className={PTR_C[p.c] || 'text-violet-600'}>{p.name}</span> : null}</div>;
          })}
        </div>
      )}

      {/* Index row */}
      {showIndex && (
        <div className="flex gap-1 mt-1">
          {items.map((_, i) => <div key={i} className="w-11 text-center text-[10px] text-slate-400">[{i}]</div>)}
        </div>
      )}
    </div>
  );
}

// ─── Visual: Sliding window ───────────────────────────────────────────────────
function WindowViz({ v }) {
  const { items = [], L = 0, R = 1, sum, limit, limitNum } = v;
  const ok = typeof limitNum === 'number' ? sum < limitNum : true;
  return (
    <div className="flex flex-col items-center gap-2 overflow-x-auto py-1 w-full">
      <div className="flex gap-1">
        {items.map((item, i) => {
          const inW = i >= L && i < R;
          return (
            <div key={i} className={`w-11 h-11 border-2 rounded-lg flex items-center justify-center text-sm font-bold
              ${inW ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
              {item.v}
            </div>
          );
        })}
      </div>
      <div className="flex gap-1">
        {items.map((_, i) => (
          <div key={i} className="w-11 text-center text-xs font-bold">
            {i === L && <span className="text-violet-600">L</span>}
            {i === R - 1 && i !== L && <span className="text-indigo-600">R</span>}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-1">
        <div className="bg-amber-100 border border-amber-300 rounded-lg px-3 py-1.5">
          <span className="text-xs font-bold text-amber-800">Sum = {sum}</span>
        </div>
        <div className={`border rounded-lg px-3 py-1.5 ${ok ? 'bg-emerald-100 border-emerald-300' : 'bg-red-100 border-red-300'}`}>
          <span className={`text-xs font-bold ${ok ? 'text-emerald-800' : 'text-red-800'}`}>{limit} → {ok ? '✓ OK!' : '✗ Too big!'}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Visual: Before / After ───────────────────────────────────────────────────
function SplitViz({ v }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-bold text-red-600 w-14 flex-shrink-0">BEFORE</span>
        <div className="flex gap-1 flex-wrap">{v.before.map((item, i) => <Box key={i} item={item} />)}</div>
      </div>
      <div className="ml-6 pl-4 text-slate-400 text-sm border-l-2 border-dashed border-slate-300 py-0.5">↕ transform</div>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-bold text-emerald-600 w-14 flex-shrink-0">AFTER</span>
        <div className="flex gap-1 flex-wrap">{v.after.map((item, i) => <Box key={i} item={item} />)}</div>
      </div>
    </div>
  );
}

// ─── Visual: Numbered steps ───────────────────────────────────────────────────
function StepsViz({ v }) {
  return (
    <div className="space-y-2 w-full">
      {v.items.map((s, i) => (
        <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
          <span className="text-xl flex-shrink-0">{s.icon}</span>
          <div>
            <p className="text-sm font-semibold text-slate-800">{s.text}</p>
            {s.sub && <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Visual: Big formula ──────────────────────────────────────────────────────
function FormulaViz({ v }) {
  return (
    <div className="w-full">
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 text-center">
        {v.title && <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">{v.title}</p>}
        <p className="text-2xl font-mono font-bold text-indigo-800 mb-2">{v.expr}</p>
        {v.note && <p className="text-xs text-indigo-500">{v.note}</p>}
      </div>
    </div>
  );
}

// ─── Visual: Binary bits ──────────────────────────────────────────────────────
function BinaryViz({ v }) {
  return (
    <div className="space-y-2 w-full">
      {v.rows.map((row, i) => (
        <div key={i} className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-slate-500 w-28 flex-shrink-0 text-right leading-tight">{row.label}</span>
          <div className="flex gap-1">
            {row.bits.map((bit, j) => (
              <div key={j} className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center text-lg font-bold
                ${bit === '1' ? 'bg-indigo-100 border-indigo-500 text-indigo-800' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                {bit}
              </div>
            ))}
          </div>
          {row.decimal !== undefined && <span className="text-sm font-bold text-slate-600">= {row.decimal}</span>}
        </div>
      ))}
      {v.note && (
        <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center">
          <span className="text-sm font-bold text-emerald-700">{v.note}</span>
        </div>
      )}
    </div>
  );
}

// ─── Visual: Permutation cycles ───────────────────────────────────────────────
function CyclesViz({ v }) {
  return (
    <div className="flex gap-8 flex-wrap justify-center py-2">
      {v.cycles.map((cycle, ci) => (
        <div key={ci} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-0 flex-wrap justify-center">
            {cycle.nodes.map((node, ni) => (
              <div key={ni} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center text-sm font-bold text-indigo-700">
                  {node}
                </div>
                {ni < cycle.nodes.length - 1 && <span className="text-indigo-400 mx-1 text-sm">→</span>}
              </div>
            ))}
            <span className="text-indigo-400 mx-1 text-sm">→ ↩</span>
          </div>
          <div className="bg-amber-100 border border-amber-300 rounded-lg px-3 py-1">
            <span className="text-xs font-bold text-amber-800">Length = {cycle.len}</span>
          </div>
        </div>
      ))}
      {v.lcm && (
        <div className="w-full text-center mt-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
          <p className="text-sm font-bold text-emerald-700">{v.lcm}</p>
        </div>
      )}
    </div>
  );
}

// ─── Visual: Min-Heap (tree) ──────────────────────────────────────────────────
function HeapViz({ v }) {
  const n = v.nodes || [];
  const rowColors = ['bg-rose-100 border-rose-400 text-rose-800', 'bg-indigo-100 border-indigo-400 text-indigo-800', 'bg-sky-100 border-sky-400 text-sky-800'];
  const levels = [[0], [1, 2], [3, 4, 5, 6]];
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Min-Heap — smallest always on top</div>
      {levels.map((level, li) => {
        const visible = level.filter(i => n[i] !== undefined);
        if (visible.length === 0) return null;
        return (
          <div key={li} className={`flex gap-${li === 0 ? '0' : li === 1 ? '8' : '4'}`} style={{ gap: li === 0 ? 0 : li === 1 ? 32 : 16 }}>
            {level.map(i => n[i] !== undefined ? (
              <div key={i} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold ${rowColors[li]}`}>
                {n[i]}
              </div>
            ) : null)}
          </div>
        );
      })}
      {v.note && <p className="text-xs text-slate-500 mt-2 text-center">{v.note}</p>}
    </div>
  );
}

// ─── Visual: Comparison table ─────────────────────────────────────────────────
function TableViz({ v }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100">
            {v.headers.map((h, i) => <th key={i} className="px-4 py-2 text-left font-bold text-slate-600 border-b border-slate-200">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {v.rows.map((row, i) => (
            <tr key={i} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
              {row.map((cell, j) => <td key={j} className="px-4 py-2 text-slate-600 border-b border-slate-100">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Visual: Two-option compare ───────────────────────────────────────────────
function CompareViz({ v }) {
  const pal = { green: ['bg-emerald-50 border-emerald-300', 'text-emerald-800'], amber: ['bg-amber-50 border-amber-300', 'text-amber-800'], red: ['bg-red-50 border-red-300', 'text-red-800'] };
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {v.options.map((opt, i) => {
        const [bg, tx] = pal[opt.c] || pal.amber;
        return (
          <div key={i} className={`rounded-xl border-2 p-4 ${bg}`}>
            <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${tx}`}>{opt.label}</p>
            <p className={`text-base font-mono font-bold ${tx}`}>{opt.result}</p>
            {opt.note && <p className="text-xs text-slate-500 mt-1">{opt.note}</p>}
          </div>
        );
      })}
    </div>
  );
}

// ─── Visual: Bucket sort ──────────────────────────────────────────────────────
function BucketViz({ v }) {
  return (
    <div className="flex gap-4 justify-center w-full flex-wrap">
      {v.buckets.map((b, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="flex gap-1 flex-wrap justify-center">
            {b.items.map((item, j) => <Box key={j} item={item} size="sm" />)}
          </div>
          <div className={`px-4 py-2 rounded-lg border-2 font-bold text-sm ${b.color === 'green' ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : b.color === 'amber' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-red-100 border-red-400 text-red-800'}`}>
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Prefix-sum visualization ─────────────────────────────────────────────────
function PrefixViz({ v }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-slate-500 w-24">Array</span>
        <div className="flex gap-1">{v.arr.map((item, i) => <Box key={i} item={item} />)}</div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-indigo-500 w-24">Prefix sum</span>
        <div className="flex gap-1">{v.prefix.map((item, i) => <Box key={i} item={item} />)}</div>
      </div>
      {v.note && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-800 font-medium">{v.note}</div>
      )}
    </div>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────
function Visual({ data }) {
  if (!data) return null;
  switch (data.type) {
    case 'array':   return <ArrayViz   v={data} />;
    case 'window':  return <WindowViz  v={data} />;
    case 'split':   return <SplitViz   v={data} />;
    case 'steps':   return <StepsViz   v={data} />;
    case 'formula': return <FormulaViz v={data} />;
    case 'binary':  return <BinaryViz  v={data} />;
    case 'cycles':  return <CyclesViz  v={data} />;
    case 'heap':    return <HeapViz    v={data} />;
    case 'table':   return <TableViz   v={data} />;
    case 'compare': return <CompareViz v={data} />;
    case 'buckets': return <BucketViz  v={data} />;
    case 'prefix':  return <PrefixViz  v={data} />;
    default: return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function WhiteboardExplainer({ whiteboard }) {
  const [frame, setFrame] = useState(0);

  if (!whiteboard) return (
    <div className="flex-1 flex items-center justify-center text-slate-400 p-8 text-center">
      <p>Whiteboard explanation coming soon for this problem.</p>
    </div>
  );

  const { tldr, frames } = whiteboard;
  const cur = frames[frame];
  const total = frames.length;

  return (
    <div className="h-full flex flex-col bg-amber-50 overflow-hidden">

      {/* TLDR strip */}
      <div className="bg-amber-100 border-b border-amber-200 px-6 py-2.5 flex-shrink-0">
        <p className="text-sm font-bold text-amber-900">
          <span className="text-amber-500 mr-2">💡 One-line summary:</span>
          {tldr}
        </p>
      </div>

      {/* Frame content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4 min-h-0">

        {/* Header row */}
        <div className="flex items-start gap-3">
          <span className="text-4xl flex-shrink-0 mt-0.5">{cur.emoji}</span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-0.5">
              Slide {frame + 1} of {total}
            </p>
            <h3 className="text-xl font-bold text-slate-800 leading-tight">{cur.heading}</h3>
          </div>
        </div>

        {/* Body */}
        <p className="text-[15px] text-slate-600 leading-relaxed">{cur.body}</p>

        {/* Visual area */}
        {cur.visual && (
          <div className="bg-white rounded-2xl border-2 border-amber-100 p-5 shadow-sm overflow-x-auto">
            <Visual data={cur.visual} />
          </div>
        )}

        {/* Think callout */}
        {cur.think && (
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex gap-3">
            <span className="text-xl flex-shrink-0">🤔</span>
            <p className="text-sm text-sky-800 leading-relaxed">{cur.think}</p>
          </div>
        )}

        {/* Key insight callout */}
        {cur.key && (
          <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-4 flex gap-3">
            <span className="text-xl flex-shrink-0">🔑</span>
            <p className="text-sm text-indigo-800 font-semibold leading-relaxed">{cur.key}</p>
          </div>
        )}

        {/* Warning callout */}
        {cur.warn && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <p className="text-sm text-rose-800 leading-relaxed">{cur.warn}</p>
          </div>
        )}
      </div>

      {/* Navigation bar */}
      <div className="border-t-2 border-amber-200 bg-white px-6 py-3 flex items-center justify-between flex-shrink-0">
        <button
          onClick={() => setFrame(f => Math.max(0, f - 1))}
          disabled={frame === 0}
          className="px-4 py-2 text-sm font-semibold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>

        {/* Progress dots */}
        <div className="flex gap-2 items-center">
          {frames.map((_, i) => (
            <button key={i} onClick={() => setFrame(i)}
              className={`rounded-full transition-all duration-200 ${i === frame ? 'w-7 h-3 bg-amber-500' : 'w-3 h-3 bg-amber-200 hover:bg-amber-300'}`}
            />
          ))}
        </div>

        <button
          onClick={() => setFrame(f => Math.min(total - 1, f + 1))}
          disabled={frame === total - 1}
          className="px-4 py-2 text-sm font-semibold bg-amber-500 text-white rounded-lg hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
