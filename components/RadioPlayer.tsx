// components/RadioPlayer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🔴 REEMPLAZAR CON LA URL REAL DE RADIO PARQUE FM 89.3
  const STREAM_URL = "https://ssl.radiosnethosting.com/index.php?port=8114";

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STREAM_URL);
      audioRef.current.volume = volume;
      audioRef.current.preload = 'none';

      audioRef.current.addEventListener('playing', () => {
        setIsPlaying(true);
        setError(null);
      });
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('error', () => {
        setError('📡 Señal offline o URL inválida');
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setError(null);
        await audioRef.current.play();
      }
    } catch {
      setError(' Toca para reproducir');
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-700 text-white shadow-lg border-t border-red-800 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/*  Play/Pause + Info */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-white text-red-700 rounded-full hover:bg-gray-100 transition font-bold text-lg shrink-0"
            aria-label={isPlaying ? 'Pausar radio' : 'Reproducir radio'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold leading-tight truncate">
              📻 Radio Parque FM 89.3
            </span>
            <span className="text-[11px] text-white/80 truncate">
              {error ? error : isPlaying ? '🟢 Transmitiendo en vivo' : '⏸️ Pausado'}
            </span>
          </div>
        </div>

        {/* 🔹 Volumen (solo desktop) */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-xs">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolume}
            className="w-20 accent-white cursor-pointer"
            aria-label="Control de volumen"
          />
        </div>
      </div>
    </div>
  );
}