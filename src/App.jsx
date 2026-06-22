import { useState, useEffect, useCallback } from 'react';
import { PROBLEMS } from './data/problems';
import { WHITEBOARDS } from './data/whiteboards';
import ProblemList         from './components/ProblemList';
import MetaphorCard        from './components/MetaphorCard';
import BreakdownGuide      from './components/BreakdownGuide';
import CodeVisualizer      from './components/CodeVisualizer';
import ComplexityPanel     from './components/ComplexityPanel';
import StepStepper         from './components/StepStepper';
import WhiteboardExplainer from './components/WhiteboardExplainer';

const TABS = ['Whiteboard', 'Metaphor', 'Breakdown', 'Code + Steps'];

function App() {
  const [selectedId,      setSelectedId]      = useState(1);
  const [activeTab,       setActiveTab]       = useState('Metaphor');
  const [currentStep,     setCurrentStep]     = useState(0);
  const [isPlaying,       setIsPlaying]       = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const problem = PROBLEMS.find((p) => p.id === selectedId);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedId, activeTab]);

  useEffect(() => {
    if (!isPlaying) return;
    const total = problem.steps.length;
    if (currentStep >= total - 1) { setIsPlaying(false); return; }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 900);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, problem]);

  const handleStep = useCallback((delta) => {
    setIsPlaying(false);
    setCurrentStep((s) => Math.max(0, Math.min(problem.steps.length - 1, s + delta)));
  }, [problem]);

  const handlePlay = useCallback(() => {
    if (currentStep >= problem.steps.length - 1) setCurrentStep(0);
    setIsPlaying((p) => !p);
  }, [currentStep, problem]);

  const handleSelectProblem = (id) => {
    setSelectedId(id);
    setActiveTab('Whiteboard');
  };

  const activeLines = activeTab === 'Code + Steps'
    ? (problem.steps[currentStep]?.highlight ?? [])
    : [];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Left sidebar */}
      <ProblemList
        problems={PROBLEMS}
        selectedId={selectedId}
        onSelect={handleSelectProblem}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Problem header */}
        <header className="px-6 pt-5 pb-0 bg-white border-b border-slate-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{problem.metaphor.icon}</span>
                <h2 className="text-xl font-bold text-slate-800">{problem.title}</h2>
              </div>
              <p className="text-sm text-slate-400">{problem.source} · {problem.category}</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Time</p>
                <p className="font-mono font-bold text-sm text-amber-600">{problem.timeComplexity}</p>
              </div>
              <div className="text-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Space</p>
                <p className="font-mono font-bold text-sm text-teal-600">{problem.spaceComplexity}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors -mb-px
                  ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                {tab === 'Whiteboard' ? '✏️ ' + tab : tab === 'Metaphor' ? '🧠 ' + tab : tab === 'Breakdown' ? '🔍 ' + tab : '⚡ ' + tab}
              </button>
            ))}
          </nav>
        </header>

        {/* Tab content */}
        <div className="flex-1 flex overflow-hidden">

          {activeTab === 'Whiteboard' && (
            <div className="flex-1 overflow-hidden">
              <WhiteboardExplainer whiteboard={WHITEBOARDS[problem.id]} />
            </div>
          )}

          {activeTab === 'Metaphor' && (
            <div className="flex-1 p-6 overflow-y-auto">
              <MetaphorCard metaphor={problem.metaphor} />
              <div className="mt-5 bg-white rounded-xl border border-slate-200 p-5">
                <h4 className="text-sm font-bold text-slate-700 mb-2">Example Input</h4>
                <p className="text-sm font-mono text-slate-600 bg-slate-50 rounded-lg p-3">{problem.example.input}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {problem.tags.map((t) => (
                  <span key={t} className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <div className="mt-5">
                <button onClick={() => setActiveTab('Breakdown')}
                  className="px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors">
                  Next: See how to break it down →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Breakdown' && (
            <div className="flex-1 p-6 overflow-y-auto">
              <BreakdownGuide breakdown={problem.breakdown} />
              <div className="mt-5">
                <button onClick={() => setActiveTab('Code + Steps')}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-500 transition-colors">
                  Next: See code + execution steps →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Code + Steps' && (
            <>
              <div className="flex-1 flex flex-col p-5 gap-4 overflow-y-auto min-w-0">
                <div className="flex items-center justify-end gap-2">
                  <label className="text-xs text-slate-500 font-medium cursor-pointer flex items-center gap-2">
                    <div onClick={() => setShowAnnotations((a) => !a)}
                      className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${showAnnotations ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                      <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${showAnnotations ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                    Show complexity annotations
                  </label>
                </div>

                <CodeVisualizer
                  annotatedCode={problem.annotatedCode}
                  activeLines={activeLines}
                  showAnnotations={showAnnotations}
                />

                <StepStepper
                  problem={problem}
                  currentStep={currentStep}
                  onStep={handleStep}
                  onPlay={handlePlay}
                  isPlaying={isPlaying}
                />

                <p className="text-[11px] text-slate-400 text-center">
                  Click <strong>Play</strong> to auto-step through the execution trace, or use Prev / Next
                </p>
              </div>

              <ComplexityPanel
                problem={problem}
                currentStep={currentStep}
                totalSteps={problem.steps.length}
              />
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default App
