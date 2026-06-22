// components/RadioPlayer.tsx
'use client';

import { useState, useRef, useEffect } from "react";
import { client } from "@/lib/sanity/client";

interface RadioConfig {
  isActive: boolean;
  streamUrl: string;
  stationName: string;
  tagline: string;
}

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<RadioConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchRadioConfig() {
      try {
        const query = `*[_type == "radioStream"][0]{
          isActive,
          streamUrl,
          stationName,
          tagline,
          sundayStreamUrl,
          sundayStationName,
          sundayTagline
        }`;
        
        const data = await client.fetch(query);
        
        if (data) {
          const today = new Date().getDay();
          const isSunday = today === 0;
          
          if (isSunday && data.sundayStreamUrl) {
            setConfig({
              isActive: data.isActive,
              streamUrl: data.sundayStreamUrl,
              stationName: data.sundayStationName || "Radio Domingo",
              tagline: data.sundayTagline || "Programa especial",
            });
          } else {
            setConfig({
              isActive: data.isActive,
              streamUrl: data.streamUrl,
              stationName: data.stationName,
              tagline: data.tagline,
            });
          }
        }
      } catch (err) {
        console.error("❌ Error al cargar config de radio:", err);
      }
    }

    fetchRadioConfig();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!config || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setError(null);
    } else {
      setIsLoading(true);
      setError(null);
      
      try {
        audioRef.current.src = '';
        audioRef.current.load();
        await new Promise(resolve => setTimeout(resolve, 50));
        
        audioRef.current.src = `/api/stream?url=${encodeURIComponent(config.streamUrl)}`;
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        await Promise.race([playPromise, timeoutPromise]);
        setIsPlaying(true);
      } catch (err) {
        setError("No se pudo conectar");
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  if (!config || !config.isActive) return null;

  return (
    <div 
      id="radio-player" 
      className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-2 px-4 shadow-lg shadow-red-900/20 z-50"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-3">
          
          {/* Izquierda: Play + Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            
            {/* Botón Play (más chico) */}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70"
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : isPlaying ? (
                <svg className="w-5 h-5 fill-red-600" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 fill-red-600 ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Info de la Radio con Animación de Ondas */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Animación de Ondas (más compacta) */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-5">
                  <div className="w-0.5 bg-white animate-[wave_1s_ease-in-out_infinite] rounded-full" style={{ animationDelay: '0ms', height: '60%' }}></div>
                  <div className="w-0.5 bg-white animate-[wave_1s_ease-in-out_infinite] rounded-full" style={{ animationDelay: '150ms', height: '100%' }}></div>
                  <div className="w-0.5 bg-white animate-[wave_1s_ease-in-out_infinite] rounded-full" style={{ animationDelay: '300ms', height: '40%' }}></div>
                  <div className="w-0.5 bg-white animate-[wave_1s_ease-in-out_infinite] rounded-full" style={{ animationDelay: '450ms', height: '80%' }}></div>
                </div>
              )}
              
              {/* Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📻</span>
                  <span className="text-sm font-bold text-white truncate">
                    {config.stationName}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0">
                  <span className="text-orange-300 text-xs">
                    {isPlaying ? '⏸ En Vivo' : '▶ Reproducir'}
                  </span>
                  {error && (
                    <span className="text-yellow-200 text-xs ml-2">{error}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Derecha: Volumen (más compacto) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleMute}
              className="p-1.5 hover:bg-red-700 rounded-lg transition"
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted || volume === 0 ? (
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-0.5 bg-red-800 rounded-lg appearance-none cursor-pointer accent-white"
              title="Volumen"
            />
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="none" />
    </div>
  );
}