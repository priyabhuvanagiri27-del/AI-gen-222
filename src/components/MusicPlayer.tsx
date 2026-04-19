/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Drift',
    artist: 'AI Virtuoso',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/200/200',
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Neural Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/cyber2/200/200',
  },
  {
    id: '3',
    title: 'Synth Dreams',
    artist: 'Silicon Soul',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/synth3/200/200',
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    let nextIndex = direction === 'next' ? currentTrackIndex + 1 : currentTrackIndex - 1;
    if (nextIndex < 0) nextIndex = DUMMY_TRACKS.length - 1;
    if (nextIndex >= DUMMY_TRACKS.length) nextIndex = 0;
    
    setCurrentTrackIndex(nextIndex);
    setProgress(0);
    // Auto play search next track if it was playing
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.error(e));
      }, 0);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p || 0);
    };

    const handleEnded = () => skipTrack('next');

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
      <audio ref={audioRef} src={currentTrack.url} />
      
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20 shrink-0">
          <motion.div
            key={currentTrack.id}
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="w-full h-full rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {isPlaying && (
            <div className="absolute -bottom-1 -right-1 flex gap-1 bg-black/50 p-1 rounded-full backdrop-blur-sm">
              <motion.div 
                animate={{ height: [4, 8, 4] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1 bg-cyan-400 rounded-full"
              />
              <motion.div 
                animate={{ height: [8, 4, 8] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-1 bg-cyan-400 rounded-full"
              />
              <motion.div 
                animate={{ height: [6, 10, 6] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="w-1 bg-cyan-400 rounded-full"
              />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold truncate text-lg">{currentTrack.title}</h3>
          <p className="text-slate-400 text-sm font-medium">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Progress Bar */}
        <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => skipTrack('prev')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>

          <button 
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center bg-white text-slate-900 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={() => skipTrack('next')}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">
        <Volume2 size={12} />
        <span>Lossless Neural Stream</span>
      </div>
    </div>
  );
}
