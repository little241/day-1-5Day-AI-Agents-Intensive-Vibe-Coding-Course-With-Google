import { useState, useEffect } from "react";
import { Snowflake, RefreshCw, XCircle } from "lucide-react";
import SnowEffect from "./components/SnowEffect";
import BalloonEffect from "./components/BalloonEffect";

export default function App() {
  const [snowTimeLeft, setSnowTimeLeft] = useState<number>(0);
  const [balloonTimeLeft, setBalloonTimeLeft] = useState<number>(0);

  // Smooth count-down ticks for Snowflake Effect (50ms interval for fluid progress rendering)
  useEffect(() => {
    if (snowTimeLeft <= 0) return;
    const interval = setInterval(() => {
      setSnowTimeLeft((prev) => {
        const next = prev - 0.05;
        return next <= 0 ? 0 : Number(next.toFixed(2));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [snowTimeLeft]);

  // Smooth count-down ticks for Balloon Effect (50ms interval for fluid progress rendering)
  useEffect(() => {
    if (balloonTimeLeft <= 0) return;
    const interval = setInterval(() => {
      setBalloonTimeLeft((prev) => {
        const next = prev - 0.05;
        return next <= 0 ? 0 : Number(next.toFixed(2));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [balloonTimeLeft]);

  const isSnowing = snowTimeLeft > 0;
  const isBallooning = balloonTimeLeft > 0;

  // Snowfall Trigger
  const triggerSnowfall = () => {
    setSnowTimeLeft(5.0);
  };

  // Balloon Trigger
  const triggerBalloons = () => {
    setBalloonTimeLeft(5.0);
  };

  // Immediate cancel controls
  const stopAllEffects = () => {
    setSnowTimeLeft(0);
    setBalloonTimeLeft(0);
  };

  return (
    <div id="app-container" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Simulation Canvases / Overlays */}
      <SnowEffect isActive={isSnowing} />
      <BalloonEffect isActive={isBallooning} />

      {/* Exquisite Top Corporate Banner */}
      <header id="app-header" className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                Atmospheric Simulation Console
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                SYSTEM_MODE: STABLE_RELEASE // VER: 1.0.4
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="app-main" className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 flex flex-col justify-center items-center gap-8">
        
        {/* Core Control Center Deck */}
        <section id="control-center" className="w-full max-w-2xl bg-slate-950/40 border border-slate-800/70 p-8 rounded-2xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
          
          {/* Subtle decoration lines for professional aesthetic */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/5 blur-3xl pointer-events-none rounded-full" />

          {/* Console Header */}
          <div className="mb-8 border-b border-slate-800/60 pb-5">
            <div className="text-xs uppercase tracking-wider font-mono text-indigo-400 mb-1">
              Active Control Deck
            </div>
            <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">
              Interactive Effects Panel
            </h2>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              Launch and manage full-screen high-performance atmospheric animations. Both snowflake fall and balloon float systems operate on independent 5-second timers.
            </p>
          </div>

          {/* Interactive Trigger Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* SNOWFLAKES CONTROL COMPONENT */}
            <div className={`p-5 rounded-xl border transition-all duration-300 ${
              isSnowing 
                ? "bg-sky-950/20 border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.05)]" 
                : "bg-slate-900/40 border-slate-800 hover:border-slate-700/80"
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${isSnowing ? "bg-sky-500/10 text-sky-400" : "bg-slate-800 text-slate-400"}`}>
                  <Snowflake className={`w-6 h-6 ${isSnowing ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
                </div>
                {isSnowing ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-sky-950/60 text-sky-400 border border-sky-800/40 animate-pulse">
                    ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-800/40 text-slate-400 border border-slate-700/30">
                    READY
                  </span>
                )}
              </div>
              
              <h3 className="text-base font-semibold text-slate-200">Snowflakes Effect</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                Spawns a continuous cascade of medium-sized crystal snowflakes falling from the top edge.
              </p>

              <button
                id="snowflake-trigger-btn"
                onClick={triggerSnowfall}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSnowing 
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 active:scale-[0.98]" 
                    : "bg-slate-800 hover:border-slate-700 border border-slate-800 text-slate-200 hover:bg-slate-750 active:scale-[0.98]"
                }`}
              >
                {isSnowing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Extend Snowflakes 
                  </>
                ) : (
                  "Trigger Snowflakes"
                )}
              </button>
            </div>

            {/* BALLOONS CONTROL COMPONENT */}
            <div className={`p-5 rounded-xl border transition-all duration-300 ${
              isBallooning 
                ? "bg-rose-950/20 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.05)]" 
                : "bg-slate-900/40 border-slate-800 hover:border-slate-700/80"
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${isBallooning ? "bg-rose-500/10 text-rose-400" : "bg-slate-800 text-slate-400"}`}>
                  {/* Miniature beautiful balloon icon */}
                  <svg 
                    viewBox="0 0 60 90" 
                    fill="currentColor" 
                    className="w-6 h-6 transition-all"
                  >
                    <path d="M 30,75 Q 33,83 30,90 T 33,100" fill="none" stroke="currentColor" strokeWidth="4" />
                    <polygon points="27,70 33,70 30,76" />
                    <ellipse cx="30" cy="38" rx="23" ry="31" />
                    <ellipse cx="21" cy="25" rx="5" ry="9" fill="#FFFFFF" opacity="0.3" transform="rotate(-15 21 25)" />
                  </svg>
                </div>
                {isBallooning ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-rose-950/60 text-rose-400 border border-rose-800/40 animate-pulse">
                    ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-800/40 text-slate-400 border border-slate-700/30">
                    READY
                  </span>
                )}
              </div>
              
              <h3 className="text-base font-semibold text-slate-200">Balloons Effect</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                Launches an array of festive, colorful medium-sized gas balloons floating up from the bottom.
              </p>

              <button
                id="balloon-trigger-btn"
                onClick={triggerBalloons}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isBallooning 
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-400 active:scale-[0.98]" 
                    : "bg-slate-800 hover:border-slate-700 border border-slate-800 text-slate-200 hover:bg-slate-755 active:scale-[0.98]"
                }`}
              >
                {isBallooning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Extend Balloons
                  </>
                ) : (
                  "Trigger Balloons"
                )}
              </button>
            </div>

          </div>

          {/* ACTIVE STATUS MONITOR */}
          {(isSnowing || isBallooning) ? (
            <div className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-5 mb-4 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  Real-Time Engine Status
                </span>
                <button 
                  onClick={stopAllEffects} 
                  className="text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Abort All Activities
                </button>
              </div>

              <div className="space-y-4">
                {/* Snow countdown tracking bar */}
                {isSnowing && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">Cascade Generator Lifespan</span>
                      <span className="font-mono text-sky-400 font-semibold">{snowTimeLeft.toFixed(1)}s remaining</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-sky-400 h-1.5 rounded-full transition-all duration-75"
                        style={{ width: `${(snowTimeLeft / 5.0) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Balloon countdown tracking bar */}
                {isBallooning && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">Buoyancy Launcher Lifespan</span>
                      <span className="font-mono text-rose-400 font-semibold">{balloonTimeLeft.toFixed(1)}s remaining</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-rose-400 h-1.5 rounded-full transition-all duration-75"
                        style={{ width: `${(balloonTimeLeft / 5.0) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center p-6 border border-dashed border-slate-800/80 rounded-xl text-slate-500 text-xs font-mono">
              STATUS: SYSTEM_READY // WAITING FOR EFFECT INITIATION INPUT //
            </div>
          )}

        </section>

        {/* Informative description footer inside card area */}
        <p className="text-xs text-slate-500 max-w-lg text-center leading-relaxed">
          This system executes hardware-accelerated fluid motion simulations inside the browser window using React, TailwindCSS, and framer-motion.
        </p>
      </main>

      {/* Exquisite Footer */}
      <footer id="app-footer" className="border-t border-slate-800/60 bg-slate-955 py-6 text-center text-xs text-slate-500 mt-auto font-mono">
        <div className="max-w-5xl mx-auto px-6">
          ENVIRONMENTAL CONTROLLER WORKSPACE © 2026
        </div>
      </footer>
    </div>
  );
}
