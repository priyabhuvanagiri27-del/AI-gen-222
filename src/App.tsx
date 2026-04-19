/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Trophy, Music as MusicIcon, Gamepad2, Zap } from 'lucide-react';

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (score: number) => {
    setCurrentScore(score);
    if (score > highScore) setHighScore(score);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,#020617_100%)]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 lg:py-12 flex flex-col items-center">
        
        {/* Header Section */}
        <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Zap className="text-white fill-current" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">NEON<span className="text-fuchsia-500">BEATS</span></h1>
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold">Snake OS v2.4.0</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex gap-4 md:gap-8"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Current Score</span>
              <div className="text-2xl font-black italic text-cyan-400 font-mono tracking-tighter">
                {String(currentScore).padStart(4, '0')}
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1 flex items-center gap-1">
                <Trophy size={10} className="text-fuchsia-400" /> High Score
              </span>
              <div className="text-2xl font-black italic text-fuchsia-400 font-mono tracking-tighter">
                {String(highScore).padStart(4, '0')}
              </div>
            </div>
          </motion.div>
        </header>

        {/* Game & Music Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8 xl:gap-12 items-start justify-center">
          
          {/* Game Window */}
          <section className="flex flex-col items-center">
            <div className="w-full flex items-center gap-3 mb-4 px-2">
              <Gamepad2 className="text-cyan-500" size={18} />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Tactical Simulation Zone</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-2 md:p-6 bg-slate-900/40 rounded-xl border border-white/5 backdrop-blur-sm">
                <SnakeGame onScoreChange={handleScoreChange} />
              </div>
            </motion.div>
          </section>

          {/* Music Player Sidebar */}
          <aside className="lg:sticky lg:top-8 flex flex-col gap-8">
            <section>
              <div className="flex items-center gap-3 mb-4 px-2">
                <MusicIcon className="text-fuchsia-500" size={18} />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Audio Uplink</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-fuchsia-500/30 to-transparent" />
              </div>
              
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <MusicPlayer />
              </motion.div>
            </section>

            {/* Extra Info Panel */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 backdrop-blur-sm"
            >
              <h3 className="text-xs font-black uppercase text-slate-500 mb-3 tracking-widest">Simulation Log</h3>
              <ul className="space-y-4 text-[10px] font-mono text-slate-400">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>ENVIRONMENT</span>
                  <span className="text-cyan-400">NEON-CORE.01</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>SNAKE_LATENCY</span>
                  <span className="text-cyan-400">150MS</span>
                </li>
                <li className="flex justify-between">
                  <span>AUDIO_DECODE</span>
                  <span className="text-fuchsia-400 font-bold">HARD_SYNCED</span>
                </li>
              </ul>
            </motion.section>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-white/5 w-full text-center">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
            © 2026 CYBERNE TICS CORP // ALL RIGHTS RESERVED
          </p>
        </footer>
      </main>
    </div>
  );
}
